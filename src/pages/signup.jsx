import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSignUp = async () => {
    // Basic validation
    if (!email || !password) {
      setError("Email and password cannot be empty");
      return;
    }

    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Display success message or take further action here
      setSuccess("User registered successfully!");
      setError(null); // Clear any previous errors
      console.log("User created with ID:", user.uid);
    } catch (error) {
      setError(error.message);
      console.error("Error registering user:", error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-center bg-slate-200 h-screen p-5">
      <div className="flex flex-col md:flex-row rounded-3xl w-full max-w-4xl bg-slate-400 h-auto md:h-3/4">
        <div className="form_container text-black flex flex-col justify-center items-center w-full md:w-1/2 p-5">
          <h1 className="text-2xl md:text-5xl font-medium">SignUp</h1>
          <p className="text-sm my-2">Or continue with email address</p>
          <div className="w-full flex flex-col items-center">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="p-2 mb-3 w-full max-w-[300px] rounded-lg outline-none cursor-default"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="p-2 mb-3 w-full max-w-[300px] rounded-lg outline-none cursor-default"
            />
          </div>
          <button
            onClick={handleSignUp}
            className="bg-blue-500 text-white py-2 px-12 rounded-3xl hover:bg-black hover:text-white w-full max-w-sm"
          >
            Submit
          </button>
          {/* Display error and success messages */}
          {error && <p className="text-red-500 mt-3">{error}</p>}
          {success && <p className="text-green-500 mt-3">{success}</p>}
        </div>
        <div className="img_container hidden md:flex md:w-1/2 justify-start 2xl:justify-center items-center p-3">
          <img
            src="/form_image.avif"
            alt="form_image"
            className="md:w-full 2xl:w-4/5 2xl:h-auto rounded-2xl md:h-[95%]"
          />
        </div>
      </div>
    </div>
  );
}

export default SignUp;
