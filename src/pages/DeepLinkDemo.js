import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";

const DeepLinkDemo = () => {
  const [url, setUrl] = useState("ftk://open/home");

  const handleDeepLink = () => {
    // Trigger the deep link
    window.location.href = url;
  };

  return (
    <Box sx={{ maxWidth: 500, mx: "auto", mt: 8, textAlign: "center" }}>
      <Typography variant="h5" gutterBottom>
        Deep Link Tester
      </Typography>

      <TextField
        fullWidth
        variant="outlined"
        label="Enter Deep Link URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        sx={{ mt: 2 }}
      />

      <Button
        variant="contained"
        color="primary"
        onClick={handleDeepLink}
        sx={{ mt: 3 }}
      >
        Open Deep Link
      </Button>

      <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
        Example: <code>ftk://open/home</code>
        <br />
        Make sure your app is installed on the device.
      </Typography>
    </Box>
  );
};

export default DeepLinkDemo;
