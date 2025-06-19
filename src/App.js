import React from "react";
import { Box, Typography } from "@mui/material";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import FooterNav from "./components/FooterNav";
import PushNotification from "./components/PushNotification";

function App() {
  return (
    <Router>
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
            <Typography variant="h6">My PWA Experience</Typography>
            <PushNotification />
          </Box>
        </Box>

        {/* Main content */}
        <Box sx={{ flexGrow: 1, p: 3, overflowY: "auto" }}>
          <AppRoutes />
        </Box>

        {/* Footer navigation */}
        <FooterNav />
      </Box>
    </Router>
  );
}

export default App;
