import React, { useState } from "react";
import {
  Box,
  Tab,
  Tabs,
  TextField,
  Button,
  Paper,
  Alert,
  Stack,
} from "@mui/material";

const AuthForm = ({ onLogin }) => {
  const [tab, setTab] = useState(0); // 0 = Login, 1 = Register
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    setError("");

    const endpoint = tab === 0 ? "/api/login" : "/api/register";

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        if (tab === 0) {
          // login
          localStorage.setItem("user", JSON.stringify(data.user));
          onLogin(data.user);
        } else {
          // register success, switch to login tab
          setTab(0);
          setForm({ username: "", password: "" });
        }
      } else {
        setError(data.message || "Something went wrong");
      }
    } catch (err) {
      setError("Server error. Please try again.");
    }
  };

  return (
    <Paper elevation={4} sx={{ p: 4, maxWidth: 400, mx: "auto", mt: 8 }}>
      <Tabs value={tab} onChange={(e, val) => setTab(val)} centered>
        <Tab label="Login" />
        <Tab label="Register" />
      </Tabs>

      <Box mt={3}>
        <Stack spacing={2}>
          <TextField
            label="Username"
            name="username"
            value={form.username}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            fullWidth
          />
          {error && <Alert severity="error">{error}</Alert>}
          <Button
            variant="contained"
            onClick={handleSubmit}
            fullWidth
            sx={{ mt: 1 }}
          >
            {tab === 0 ? "Login" : "Register"}
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
};

export default AuthForm;
