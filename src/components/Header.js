import React from "react";
import { AppBar, Toolbar, Typography, IconButton, Box } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import PushNotification from "./PushNotification";
import { isAdmin, logoutUser } from "../utils/auth";

const Header = ({ user }) => {
  return (
    <AppBar position="static" className="header-section" sx={{ mb: 2 }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Left: Greeting and role */}
        <Box display="flex" alignItems="center" gap={2}>
          <Typography variant="h6" component="div">
            {/* Hi {user.username} */} Toolkit
          </Typography>
          {isAdmin(user) && (
            <AdminPanelSettingsIcon fontSize="small" titleAccess="Admin User" />
          )}
        </Box>

        {/* Right: Push and Logout */}
        <Box display="flex" alignItems="center" gap={2}>
          <PushNotification userId={user._id} />
          <IconButton
            edge="end"
            color="inherit"
            title="Logout"
            onClick={() => logoutUser()}
          >
            <LogoutIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
