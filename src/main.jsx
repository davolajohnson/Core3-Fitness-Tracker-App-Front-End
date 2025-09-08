import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";          // App handles routes (but NOT BrowserRouter)
import "./App.css";               // your all-in-one stylesheet 
import{UserProvider} from './contexts/UserContext'

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
  <UserProvider>
    <App />
    </UserProvider>
  </BrowserRouter>
);