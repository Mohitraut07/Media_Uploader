import React, { useState } from "react";
import { db } from "../firebase"; // Import Firestore instance from firebase.js
import { collection, query, where, getDocs } from "firebase/firestore"; // Firestore functions

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
      // Query Firestore to check if a user with the provided email and password exists
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("email", "==", email), where("password", "==", password));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // User found
        querySnapshot.forEach((doc) => {
          console.log("User found:", doc.id, "=>", doc.data());
        });
        setSuccess("Login successful! Welcome " + email);
      } else {
        // No user found
        setError("Invalid email or password.");
      }
    } catch (e) {
      console.error("Error logging in: ", e.message);
      setError("An error occurred while logging in. Please try again.");
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
