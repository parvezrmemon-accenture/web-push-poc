import React from "react";
import { Button, Typography } from "@mui/material";

const Home = () => {
  return (
    <>
      <Typography variant="h4" sx={{ mt: 2 }}>
        Welcome to Home Page
      </Typography>

      <Button
        variant="outlined"
        onClick={() =>
          fetch("/api/send-notification", {
            method: "POST",
          })
        }
      >
        Test Push
      </Button>
    </>
  );
};

export default Home;
