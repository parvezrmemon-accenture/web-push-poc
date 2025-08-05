import React from "react";
import { Typography } from "@mui/material";
import { getCurrentUser } from "../utils/auth";

const Home = () => {
  const user = getCurrentUser();
  return (
    <>
      <Typography variant="h6" component="div">
        Hi {user.username}, Welcome to Toolkit
      </Typography>
    </>
  );
};

export default Home;
