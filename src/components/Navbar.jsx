import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <div className="w-full h-20 bg-slate-50 flex justify-between items-center gap-4 font-medium">
      <NavLink to={"/"} className="mx-5 hover:text-xl hover:text-blue-400 transition ease-in-out">MediaUploader</NavLink>
      <div className="flex justify-between items-center gap-x-5 mx-5">
        <NavLink to={"/login"} className="hover:bg-black hover:text-white p-2 rounded-md active:text-blue-400">Login</NavLink>
        <NavLink to={"/signup"} className="hover:bg-black hover:text-white p-2 rounded-md active:text-blue-400">SignUp</NavLink>
      </div>
    </div>
  );
}

export default Navbar;
