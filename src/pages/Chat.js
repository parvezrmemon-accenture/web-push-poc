import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Divider,
  Typography,
} from "@mui/material";
import ChatPopup from "./ChatPopup";

const Chat = () => {
  const [openChatId, setOpenChatId] = useState(null);

  const hotlines = [
    { id: 1, name: "Hotline 1" },
    { id: 2, name: "Hotline 2" },
    { id: 3, name: "Hotline 3" },
    { id: 4, name: "Hotline 4" },
  ];

  return (
    <>
      <List>
        {hotlines.map((h) => (
          <React.Fragment key={h.id}>
            <ListItem button onClick={() => setOpenChatId(h.id)}>
              <ListItemText
                primary={<Typography variant="subtitle1">{h.name}</Typography>}
                secondary={
                  <>
                    <Typography variant="body2">
                      {h.id === 4
                        ? "We will resolve your query"
                        : "Tap to start chat"}
                    </Typography>
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
