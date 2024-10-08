import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <div className="w-full h-10 bg-slate-50 flex justify-center gap-4">
      <NavLink
      
       to={"/login"}>Login</NavLink>
      <NavLink

       to={"/signup"}>SignUp</NavLink>
    </div>
  );
}

export default Navbar;
