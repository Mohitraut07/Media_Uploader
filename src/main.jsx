import React from "react";
import { createRoot } from "react-dom/client"; // Import createRoot from react-dom/client
import App from "./App";
import { AuthProvider } from "./hooks/useAuth";
import "./index.css";

// Get the root element from the DOM
const container = document.getElementById("root");

// Create a root and render the App inside it
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
