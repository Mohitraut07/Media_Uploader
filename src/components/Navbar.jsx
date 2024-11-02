import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });
    return () => unsubscribe();
  }, []);

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close menu if clicked outside
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!event.target.closest(".navbar-menu") && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [isMenuOpen]);

  return (
    <div className="w-full h-20 bg-slate-50 flex justify-between items-center px-5 md:px-10 font-medium shadow-md relative z-20">
      <NavLink
        to="/"
        className="text-lg font-semibold hover:text-blue-400 transition ease-in-out mx-5"
      >
        MediaUploader
      </NavLink>

      {/* Mobile Toggle Button */}
      <button
        onClick={toggleMenu}
        className="text-2xl md:hidden focus:outline-none z-30"
      >
        {isMenuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Links - Responsive Layout */}
      <div
        className={`navbar-menu ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transform fixed md:relative top-0 left-0 w-full md:w-auto h-full md:h-auto bg-slate-50 md:bg-transparent shadow-lg md:shadow-none transition-transform duration-300 ease-in-out flex flex-col md:flex-row items-center gap-5 pt-20 md:pt-0 px-10 md:px-0`}
      >
        {isLoggedIn ? (
          <NavLink
            to="/user/dashboard"
            className="hover:bg-black hover:text-white px-4 py-2 rounded-md active:text-blue-400 mx-5"
            onClick={() => setIsMenuOpen(false)}
          >
            Dashboard
          </NavLink>
        ) : (
          <>
            <NavLink
              to="/login"
              className="hover:bg-black hover:text-white px-4 py-2 rounded-md active:text-blue-400 mx-5"
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </NavLink>
            <NavLink
              to="/signup"
              className="hover:bg-black hover:text-white px-4 py-2 rounded-md active:text-blue-400 mx-5"
              onClick={() => setIsMenuOpen(false)}
            >
              Sign Up
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
