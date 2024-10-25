import React, { useState } from "react";
import { db } from "../firebase"; // Import Firestore instance from firebase.js
import { collection, query, where, getDocs } from "firebase/firestore"; // Firestore functions
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth"; // Import GoogleAuthProvider and other Firebase functions

const auth = getAuth(); // Initialize Firebase Auth instance

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); // To handle error messages

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Email and password cannot be empty");
      return;
    }
    setError(null);

    try {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("email", "==", email), where("password", "==", password));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          console.log("User found:", doc.id, "=>", doc.data());
        });
        console.log("Login successful! Welcome " + email);
      } else {
        console.log("Invalid email or password.");
        setError("Invalid email or password.");
      }
    } catch (e) {
      console.error("Error logging in: ", e.message);
      setError("An error occurred while logging in. Please try again.");
    }
  };

  const callGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider(); // Create new Google Auth Provider instance

    try {
      const result = await signInWithPopup(auth, provider); // Use signInWithPopup with auth and provider
      const user = result.user;
      console.log("Google Sign-in successful:", user);
      // You can redirect or save user info here
    } catch (error) {
      console.error("Error with Google Sign-in:", error.message);
      setError(error.message);
    }
  };

  return (
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
              className="px-8 py-2 md:px-12 rounded-lg bg-slate-50 hover:bg-black hover:text-white border border-gray-400"
              onClick={callGoogleSignIn} // Ensure this is a function call
            >
              Google
            </button>
            <button className="px-8 py-2 md:px-12 rounded-lg bg-slate-50 hover:bg-black hover:text-white border border-gray-400">
              GitHub
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
