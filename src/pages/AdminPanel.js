import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Snackbar,
  OutlinedInput,
  Checkbox,
  ListItemText,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { getCurrentUser } from "../utils/auth";

export default function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [broadcast, setBroadcast] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [url, setUrl] = useState("");
  const [snackbar, setSnackbar] = useState(false);

  const user = getCurrentUser();
  const adminId = user._id;

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then(setUsers);
  }, []);

  const handleSend = async () => {
    const payload = {
      title,
      body,
      url,
      ...(broadcast ? {} : { userIds: selectedUsers }),
      adminId,
    };

    await fetch("/api/send-notification", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setSnackbar(true);
    setTitle("");
    setBody("");
    setUrl("");
    if (!broadcast) setSelectedUsers([]);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" mb={3}>
        Admin Push Notification Panel
      </Typography>

      <FormControlLabel
        control={
          <Switch
            checked={broadcast}
            onChange={(e) => setBroadcast(e.target.checked)}
            color="primary"
          />
        }
        label="Broadcast to all users"
        sx={{ mb: 2 }}
      />

      {!broadcast && (
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Select Users</InputLabel>
          <Select
            multiple
            value={selectedUsers}
            onChange={(e) => setSelectedUsers(e.target.value)}
            input={<OutlinedInput label="Select Users" />}
            renderValue={(selected) =>
              selected
                .map((id) => {
                  const user = users.find((u) => u._id === id);
                  return user?.username || id;
                })
                .join(", ")
            }
          >
            {users.map((user) => (
              <MenuItem key={user._id} value={user._id}>
                <Checkbox checked={selectedUsers.indexOf(user._id) > -1} />
                <ListItemText primary={user.username} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      <TextField
        fullWidth
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        multiline
        rows={3}
        label="Message"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        multiline
        rows={3}
        label="URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        sx={{ mb: 2 }}
      />

      <Button
        variant="contained"
        onClick={handleSend}
        disabled={(!broadcast && selectedUsers.length === 0) || !title}
      >
        Send Notification
      </Button>

      <Snackbar
        open={snackbar}
        autoHideDuration={3000}
        onClose={() => setSnackbar(false)}
        message={`Notification sent to ${
          broadcast ? "all users" : "selected users"
        }!`}
      />
    </Box>
  );
}
