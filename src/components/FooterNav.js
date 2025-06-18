import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ChatIcon from "@mui/icons-material/Chat";

const FooterNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const pathToValue = {
    "/": "home",
    "/calendar": "calendar",
    "/chat": "chat",
  };

  const valueToPath = {
    home: "/",
    calendar: "/calendar",
    chat: "/chat",
  };

  const currentValue = pathToValue[location.pathname] || "home";

  return (
    <Paper sx={{ position: "sticky", bottom: 0 }} elevation={3}>
      <BottomNavigation
        showLabels
        value={currentValue}
        onChange={(e, newValue) => navigate(valueToPath[newValue])}
      >
        <BottomNavigationAction label="Home" value="home" icon={<HomeIcon />} />
        <BottomNavigationAction
          label="Calendar"
          value="calendar"
          icon={<CalendarTodayIcon />}
        />
        <BottomNavigationAction label="Chat" value="chat" icon={<ChatIcon />} />
      </BottomNavigation>
    </Paper>
  );
};

export default FooterNav;
