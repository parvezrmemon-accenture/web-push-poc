import React from "react";
import { Box, Typography } from "@mui/material";
import { BrowserRouter as Router, HashRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import FooterNav from "./components/FooterNav";

function App() {
  return (
    <HashRouter>
      <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
        {/* Header */}
        <Box sx={{ p: 2, bgcolor: "primary.main", color: "white" }}>
          <Typography variant="h6">My PWA Experience</Typography>
        </Box>

        {/* Main content */}
        <Box sx={{ flexGrow: 1, p: 3, overflowY: "auto" }}>
          <AppRoutes />
        </Box>

        {/* Footer navigation */}
        <FooterNav />
      </Box>
    </HashRouter>
  );
}

export default App;
