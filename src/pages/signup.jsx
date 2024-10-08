import React, { useState } from "react";
import {db} from "../firebase";
import { collection, addDoc } from "firebase/firestore"; 

function signup() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const getData = async () => {
    console.log(name);
    console.log(password);


    try{

    const docRef = await addDoc(collection(db, "users"), {
        first: name,
        password: password,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center bg-slate-200">
      <h1>Sign Page</h1>
      <div>
        <label htmlFor="">Name</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label htmlFor="">Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button onClick={getData}>Submit</button>
    </div>
  );
}

export default signup;
