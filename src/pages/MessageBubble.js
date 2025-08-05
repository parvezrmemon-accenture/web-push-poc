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
        backgroundColor: isUser ? "#1B6CFF" : "#e3f2fd",
        maxWidth: "80%",
        color: isUser ? "#FFFFFF" : "#091521B8",
      }}
    >
      <Typography variant="body2">{message.text}</Typography>
    </Paper>
  );
};

export default MessageBubble;
