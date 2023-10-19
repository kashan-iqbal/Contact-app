import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import ContactContextProvider from "./Context/ContactsContext";
import { UserContextProvider } from "./Context/UserContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ContactContextProvider>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </ContactContextProvider>
  </React.StrictMode>
);
