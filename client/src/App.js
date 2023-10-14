import React from "react";
import Home from "./Pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import FavoriteContacts from "./Pages/FavoriteContacts";
import AddContacts from "./Pages/AddContacts";
import Profilepage from "./Pages/Profilepage";
import Login from "./Pages/Auth/Login";
import Siginup from "./Pages/Auth/Signup";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/Favorite" element={<FavoriteContacts />} />
        <Route path="/Add-Contacts" element={<AddContacts />} />
        <Route path="/Profile" element={<Profilepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Siginup />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
