import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Calendar from "../pages/Calendar";
import Chat from "../pages/Chat";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/calendar" element={<Calendar />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
};

export default AppRoutes;
