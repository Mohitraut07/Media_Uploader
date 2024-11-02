import React,{useState,useEffect} from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import Login from "./pages/login.jsx";
import Signup from "./pages/signup.jsx";
import Dashboard from "./components/Dashboard.jsx";
import { useAuth } from "./hooks/useAuth"; // Custom hook to check auth status

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

function App() {
  const { user } = useAuth(); // Check user login status

  const [userName, setUserName] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for user login status on app load
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUserName(currentUser);
      setLoading(false); // Stop loading once the auth check is complete
    });

    return unsubscribe; // Unsubscribe from listener when component unmounts
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/user/dashboard" element={userName ? <Dashboard user={userName} /> : <Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
