import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";



function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const handleLogin = async () => {
    // Basic validation
    if (!email || !password) {
      setError("Email and password cannot be empty");
      return;
    }
    
    try {
      const docRef = await addDoc(collection(db, "users"), {
        email: email,
        password: password,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  




  return (
    <div className="flex flex-col md:flex-row justify-center items-center bg-slate-200 h-screen p-5">
      <div className="flex flex-col md:flex-row rounded-3xl w-full max-w-4xl bg-slate-400 h-auto md:h-3/4">
        <div className="form_container text-black flex flex-col justify-center items-center w-full md:w-1/2 p-5">
          <h1 className="text-2xl md:text-5xl font-medium">SignUp</h1>
          {/* <p className="text-sm md:my-5 my-3">Sign in with Open Account</p>
          <div className="provider_container flex flex-col md:flex-row justify-center items-center md:gap-5 gap-2 mb-3">
            <button className="px-8 py-2 md:px-12 rounded-lg bg-slate-50 hover:bg-black hover:text-white border border-gray-400" onClick={()=>signInWithPopup}>
              Google
            </button>
            <button className="px-8 py-2 md:px-12 rounded-lg bg-slate-50 hover:bg-black hover:text-white border border-gray-400">
              GitHub
            </button>
          </div> */}
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
            onClick={handleLogin}
            className="bg-blue-500 text-white py-2 px-12 rounded-3xl hover:bg-black hover:text-white w-full max-w-sm"
          >
            Submit
          </button>
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
