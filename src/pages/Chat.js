import React, { useEffect, useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Divider,
  Typography,
} from "@mui/material";
import ChatPopup from "./ChatPopup";
import { useLocation } from "react-router-dom";

const hotlines = [
  { id: 1, name: "Hotline 1" },
  { id: 2, name: "Hotline 2" },
  { id: 3, name: "Hotline 3" },
  { id: 4, name: "Hotline 4" },
];

const Chat = () => {
  const location = useLocation();
  const [openChatId, setOpenChatId] = useState(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const deepLink = queryParams.get("deepLink");

    if (deepLink === "true") {
      // Delay to ensure widget is loaded
      setTimeout(() => {
        setOpenChatId(hotlines[0].id);
      }, 1500);
    }
  }, [location.search]);

  return (
    <>
      <List>
        {hotlines.map((h) => (
          <React.Fragment key={h.id}>
            <ListItem onClick={() => setOpenChatId(h.id)}>
              <ListItemText
                primary={<Typography variant="subtitle1">{h.name}</Typography>}
                secondary={
                  <>
                    {h.id === 4
                      ? "We will resolve your query"
                      : "Tap to start chat"}
                  </>
                }
              />
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>

      {/* Popup Chat */}
      <ChatPopup
        open={Boolean(openChatId)}
        onClose={() => setOpenChatId(null)}
        hotlineName={hotlines.find((h) => h.id === openChatId)?.name}
      />
    </>
  );
};

export default Chat;
