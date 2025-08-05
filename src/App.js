import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import FooterNav from "./components/FooterNav";
import AuthForm from "./components/AuthForm";
import { getCurrentUser } from "./utils/auth";
import Header from "./components/Header";
import "./index.css";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = getCurrentUser();
    if (saved) setUser(saved);
  }, []);

  return (
    <Router>
      {user ? (
        <Box
          className="app-wrapper"
          sx={{ display: "flex", flexDirection: "column", height: "100vh" }}
        >
          {/* Header */}
          <Header user={user} />

          {/* Main content */}
          <Box sx={{ flexGrow: 1, p: 3, overflowY: "auto" }}>
            <AppRoutes />
          </Box>

          {/* Footer navigation */}
          <FooterNav />
        </Box>
      ) : (
        // If not logged in, render only the login/register page
        <Routes>
          <Route path="*" element={<AuthForm onLogin={setUser} />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
