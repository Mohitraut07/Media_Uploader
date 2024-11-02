import { useEffect, useState, useContext, createContext } from "react";
import { auth } from "../firebase"; // Make sure this points to your firebase config

// Create a Context for auth
const AuthContext = createContext();

// This component will wrap around App or any higher-level component to provide user info
export function AuthProvider({ children }) {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

// Custom hook to access the auth context
export const useAuth = () => useContext(AuthContext);

function useProvideAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user ? user : null);
    });
    return () => unsubscribe(); // Clean up the subscription on unmount
  }, []);

  return { user };
}
