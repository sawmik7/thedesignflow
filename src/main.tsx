import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { scan } from "react-scan";
import App from "./App";
import "./app/globals.css";

if (typeof window !== "undefined") {
  scan({
    enabled: (import.meta as any).env.DEV,
  });
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
