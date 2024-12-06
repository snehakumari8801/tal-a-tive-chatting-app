import React from "react";
import "./index.css";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router";
import ChatProvider from "./context/ChatProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ChatProvider>
      <App />
    </ChatProvider>
  </BrowserRouter>
);
