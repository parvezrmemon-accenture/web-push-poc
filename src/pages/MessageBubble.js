import React from "react";
import { Paper, Typography } from "@mui/material";

const MessageBubble = ({ message }) => {
  const isUser = message.from === "user";

  return (
    <Paper
      elevation={1}
      sx={{
        p: 1,
        alignSelf: isUser ? "flex-end" : "flex-start",
        backgroundColor: isUser ? "#e3f2fd" : "#f1f8e9",
        maxWidth: "80%",
      }}
    >
      <Typography variant="body2">{message.text}</Typography>
    </Paper>
  );
};

export default MessageBubble;
