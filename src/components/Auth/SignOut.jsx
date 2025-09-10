// src/components/Auth/SignOut.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "../../services/authServices";
import { useAuth } from "../../context/AuthContext";

export default function SignOut() {
  const nav = useNavigate();
  const { setUser } = useAuth();

  useEffect(() => {
    signOut();       // clear token
    setUser(null);   // clear user in context
    nav("/sign-in"); // redirect
  }, [nav, setUser]);

  return null;
}

