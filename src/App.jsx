import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import "./App.css";
import HomePage from "./stores/pages/HomePage";
import UserCart from "./stores/UserCart";
import Single from "./stores/singles/Single";
import LoginPage from "./stores/components/Login";
import Forgot from "./stores/components/Forgot";
import EditPage from "./stores/components/Edit";
import Now from "./stores/now/Now";
import Profile from "./stores/components/Profile";
import Logout from "./stores/components/Logout";
import Orders from "./stores/components/Orders";

const App = () => {


  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/edit" element={<EditPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/cart" element={<UserCart />} />
        <Route path="/single" element={<Single />} />
        <Route path="/now" element={<Now />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/Logout" element={<Logout />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
    </div>
  );
};

export default App;
