import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Box,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MessageBubble from "./MessageBubble";

const ChatPopup = ({ open, onClose, hotlineName = "Hotline" }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [step, setStep] = useState(0); // controls conversation flow

  // Auto-start the conversation when popup opens
  useEffect(() => {
    if (open) {
      resetChat();
      setTimeout(() => {
        addAgentMessage(`Hi, thank you for reaching ${hotlineName} chat.`);
        setStep(1);
      }, 500);
    }
  }, [open]);

  const resetChat = () => {
    setMessages([]);
    setInput("");
    setStep(0);
  };

  const addUserMessage = (text) => {
    setMessages((prev) => [...prev, { id: Date.now(), from: "user", text }]);
  };

  const addAgentMessage = (text) => {
    setMessages((prev) => [
      ...prev,
      { id: Date.now() + 1, from: "agent", text },
    ]);
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userText = input.trim();
    addUserMessage(userText);
    setInput("");

    // Based on current step, respond accordingly
    setTimeout(() => {
      if (step === 1) {
        addAgentMessage(
          "Kindly enter a brief description of your query, we will try to provide the best solution we can."
        );
        setStep(2);
      } else if (step === 2) {
        addAgentMessage(
          "Thank you for the detailed response, we will get back to you shortly with an update."
        );
        setStep(3); // end of scripted flow
      }
    }, 1200);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen
      PaperProps={{ sx: { p: 1 } }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          background: "rgb(236 245 255)",
        }}
      >
        <Typography variant="h6">Chat with {hotlineName}</Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
          height: "calc(100% - 64px)", // adjust for header
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 1,
            mt: 1,
            pr: 1,
          }}
        >
          {messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))}
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: 1,
            mt: 2,
          }}
        >
          <TextField
            fullWidth
            size="small"
            variant="outlined"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <Button variant="contained" onClick={handleSend}>
            Send
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ChatPopup;
