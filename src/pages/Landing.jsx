// src/pages/Landing.js
import React from "react";
import { Link } from "react-router-dom";

function Landing() {
  return (
    <div className="landing-container bg-slate-100 min-h-screen flex flex-col items-center justify-center text-center p-4">
      {/* Hero Section */}
      <section className="hero bg-blue-500 text-white py-16 px-4 md:py-20 md:px-6 w-full">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4">
          Upload & Manage Your Media Effortlessly
        </h1>
        <p className="text-base md:text-lg lg:text-xl mb-6 md:mb-8">
          Organize, view, and share your media in one place. Fast, simple, and secure.
        </p>
        <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4">
          <Link
            to="/signup"
            className="bg-white text-blue-500 px-6 py-3 rounded-full font-semibold hover:bg-blue-100 transition duration-300 m-1 w-3/4 md:w-auto text-center"
          >
            Get Started
          </Link>
          <Link
            to="/login"
            className="bg-transparent border-2 border-white px-6 py-3 rounded-full font-semibold text-white hover:bg-blue-600 transition duration-300 m-1 w-3/4 md:w-auto text-center"
          >
            Login
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="features py-12 px-4 md:py-16 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="feature-card bg-white shadow-lg p-6 rounded-lg">
          <h3 className="font-bold text-lg md:text-xl mb-2">Fast Uploads</h3>
          <p className="text-gray-600 text-sm md:text-base">
            Experience fast and seamless uploads, no matter the file size.
          </p>
        </div>
        <div className="feature-card bg-white shadow-lg p-6 rounded-lg">
          <h3 className="font-bold text-lg md:text-xl mb-2">Secure Storage</h3>
          <p className="text-gray-600 text-sm md:text-base">
            Your files are encrypted and securely stored in the cloud.
          </p>
        </div>
        <div className="feature-card bg-white shadow-lg p-6 rounded-lg">
          <h3 className="font-bold text-lg md:text-xl mb-2">Easy Sharing</h3>
          <p className="text-gray-600 text-sm md:text-base">
            Easily share your files with friends and colleagues.
          </p>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="cta bg-blue-500 text-white py-16 px-4 md:py-20 md:px-6 w-full">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Start Uploading?</h2>
        <p className="mb-6 md:mb-8 text-sm md:text-base">
          Sign up now to get access to your personal media space.
        </p>
        <Link
          to="/signup"
          className="bg-white text-blue-500 px-6 py-3 rounded-full font-semibold hover:bg-blue-100 transition duration-300"
        >
          Sign Up
        </Link>
      </section>

      {/* Footer Section */}
      <footer className="footer text-gray-700 py-6 text-center text-xs md:text-sm">
        <p>&copy; 2024 MediaUploader. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Landing;
