import { useState } from "react";
import Navbar from "./components/Navbar";
import Login from "./pages/login";
import SignUp from "./pages/signup";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login />}>
              Login
            </Route>
            <Route path="signup" element={<SignUp />}>
              SignUp
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
