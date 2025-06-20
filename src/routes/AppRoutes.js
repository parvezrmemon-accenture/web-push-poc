import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Calendar from "../pages/Calendar";
import Chat from "../pages/Chat";
import AdminRoute from "./AdminRoute";
import AdminPanel from "../pages/AdminPanel";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/calendar" element={<Calendar />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="*" element={<Home />} />
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminPanel />
          </AdminRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
