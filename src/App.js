import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import FooterNav from "./components/FooterNav";
import PushNotification from "./components/PushNotification";
import AuthForm from "./components/AuthForm";
import { getCurrentUser, logoutUser } from "./utils/auth";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = getCurrentUser();
    if (saved) setUser(saved);
  }, []);

  return (
    <Router>
      {user ? (
        <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
          {/* Header */}
          <Box sx={{ p: 2, bgcolor: "primary.main", color: "white" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h6">Hi {user.username}</Typography>
              <PushNotification userId={user._id} />
              <Button
                variant="outlined"
                color="inherit"
                onClick={() => logoutUser()}
              >
                Logout
              </Button>
            </Box>
          </Box>

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
