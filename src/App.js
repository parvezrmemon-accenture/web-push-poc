import React, { useEffect, useState } from "react";
import { Box, CssBaseline } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import AppRoutes from "./routes/AppRoutes";
import FooterNav from "./components/FooterNav";
import AuthForm from "./components/AuthForm";
import { getCurrentUser } from "./utils/auth";
import Header from "./components/Header";
import "./index.css";

// Create theme with Open Sans
const theme = createTheme({
  typography: {
    fontFamily: "Open Sans, Roboto, Arial, sans-serif",
  },
});

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = getCurrentUser();
    if (saved) setUser(saved);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        {user ? (
          <Box
            className="app-wrapper"
            sx={{ display: "flex", flexDirection: "column", height: "100vh" }}
          >
            <Header user={user} />

            <Box sx={{ flexGrow: 1, p: 2, overflowY: "auto" }}>
              <AppRoutes />
            </Box>

            <FooterNav />
          </Box>
        ) : (
          <Routes>
            <Route path="*" element={<AuthForm onLogin={setUser} />} />
          </Routes>
        )}
      </Router>
    </ThemeProvider>
  );
}

export default App;
