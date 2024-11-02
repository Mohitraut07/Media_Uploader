import React, { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const SideNav = ({ activeTab, setActiveTab }) => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar toggle state

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/"); // Redirect to home page on successful logout
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  // Toggle sidebar for mobile view
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex">
      {/* Mobile Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="sm:hidden p-2 text-white bg-gray-800 fixed bottom-4 left-4 z-50"
      >
        {isSidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {/* Sidebar Menu */}
      <div
        className={`fixed sm:relative sm:translate-x-0 top-0 left-0 w-full h-full sm:w-64 sm:h-screen bg-gray-900 text-white flex flex-col items-center p-4 z-40 transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full sm:translate-x-0"
        }`}
      >
        <button
          onClick={() => setActiveTab("profile")}
          className={`w-full p-4 mb-2 text-center rounded-lg ${
            activeTab === "profile" && "bg-gray-700"
          }`}
        >
          Profile
        </button>
        <button
          onClick={() => setActiveTab("upload")}
          className={`w-full p-4 mb-2 text-center rounded-lg ${
            activeTab === "upload" && "bg-gray-700"
          }`}
        >
          Upload
        </button>
        <button
          onClick={() => setActiveTab("media")}
          className={`w-full p-4 mb-2 text-center rounded-lg ${
            activeTab === "media" && "bg-gray-700"
          }`}
        >
          Media
        </button>
        <button
          onClick={() => setActiveTab("storage")}
          className={`w-full p-4 mb-2 text-center rounded-lg ${
            activeTab === "storage" && "bg-gray-700"
          }`}
        >
          Storage Used
        </button>

        <button
          onClick={handleLogout}
          className="w-full p-4 mt-auto bg-red-600 hover:bg-red-700 rounded-lg text-center"
        >
          Log Out
        </button>
      </div>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 sm:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
};

export default SideNav;
