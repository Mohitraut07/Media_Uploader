import React, { useState } from "react";
import { db, auth } from "../firebase"; // Import Firestore and Auth instances
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { signInWithPopup, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth"; // Import GitHubAuthProvider
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { FaGoogle, FaGithub } from "react-icons/fa"; // Import icons

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Email and password cannot be empty");
      return;
    }
    setError(null);

    try {
      const auth = getAuth();
      const querySnapshot = await signInWithEmailAndPassword(auth, email, password);
      const user = querySnapshot.user;

      if (user) {
        console.log("Login successful! Welcome " + email);
        navigate("/user/dashboard"); // Redirect to dashboard on success
      } else {
        setError("Invalid email or password.");
      }
    } catch (e) {
      console.error("Error logging in: ", e.message);
      setError("An error occurred while logging in. Please try again.");
    }
  };

  const callGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider(); // Create a new Google Auth Provider instance

    try {
      const result = await signInWithPopup(auth, provider);
      console.log("Google Sign-in successful:", result.user);
      navigate("/user/dashboard"); // Redirect to dashboard on success
    } catch (error) {
      console.error("Error with Google Sign-in:", error.message);
      setError("Google Sign-in failed. Please try again.");
    }
  };

  const callGitHubSignIn = async () => {
    const provider = new GithubAuthProvider(); // Create a new GitHub Auth Provider instance

    try {
      const result = await signInWithPopup(auth, provider);
      console.log("GitHub Sign-in successful:", result.user);
      navigate("/user/dashboard"); // Redirect to dashboard on success
    } catch (error) {
      console.error("Error with GitHub Sign-in:", error.message);
      setError("GitHub Sign-in failed. Please try again.");
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row justify-center items-center bg-slate-200 h-screen p-5">
        <div className="flex flex-col md:flex-row rounded-3xl w-full max-w-4xl bg-slate-400 h-auto md:h-3/4">
          <div className="img_container hidden md:flex md:w-1/2 justify-center items-center p-3">
            <img
              src="/form_image_2.avif"
              alt="form_image"
              className="w-4/5 h-auto rounded-2xl"
            />
          </div>
          <div className="form_container text-black flex flex-col justify-center items-center w-full md:w-1/2 p-5">
            <h1 className="text-2xl md:text-5xl font-medium">Login</h1>
            <p className="text-sm md:my-5 my-3">Login to your account</p>

            {/* Display any error messages */}
            {error && <p className="text-red-500 mb-4">{error}</p>}

            <div className="w-full flex flex-col items-center">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="p-2 mb-3 w-full max-w-[300px] rounded-lg border-none"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="p-2 mb-3 w-full max-w-[300px] rounded-lg border-none"
              />
            </div>

            <button
              onClick={handleLogin}
              className="bg-blue-500 text-white py-2 px-12 rounded-3xl hover:bg-black hover:text-white w-full max-w-sm"
            >
              Submit
            </button>

            <p className="text-sm my-2">Or login with your social account</p>

            <div className="provider_container flex flex-col md:flex-row justify-center items-center md:gap-5 gap-2 mb-3">
              <button
                className="flex items-center justify-center gap-2 px-8 py-2 md:px-12 rounded-lg bg-slate-50 hover:bg-black hover:text-white border border-gray-400"
                onClick={callGoogleSignIn}
              >
                <FaGoogle className="text-lg" />
                Google
              </button>
              <button
                className="flex items-center justify-center gap-2 px-8 py-2 md:px-12 rounded-lg bg-slate-50 hover:bg-black hover:text-white border border-gray-400"
                onClick={callGitHubSignIn}
              >
                <FaGithub className="text-lg" />
                GitHub
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
