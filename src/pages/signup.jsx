import React, { useState } from "react";
import { auth } from "../firebase"; // Import the 'auth' instance from firebase.js
import { signInWithEmailAndPassword } from "firebase/auth"; 

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleLogin = async () => {
    // Basic validation
    if (!email || !password) {
      setError("Email and password cannot be empty");
      return;
    }
    setError(null); // Reset the error state

    try {
      // Sign in using Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("User logged in:", user.email);
      setSuccess("Login successful! Welcome " + user.email);
    } catch (e) {
      console.error("Error logging in: ", e.message);
      setError(e.message);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center bg-slate-200 h-screen">
      <h1>Login Page</h1>
      <div>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border-2 p-2 m-2"
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border-2 p-2 m-2"
        />
      </div>
      <button onClick={handleLogin} className="bg-blue-500 text-white p-2 m-2">
        Submit
      </button>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
    </div>
  );
}

export default Login;
