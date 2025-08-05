import React, { useEffect, useState } from "react";
import {
  Tabs,
  Tab,
  Typography,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Box,
  Link,
  Divider,
} from "@mui/material";
import { getCurrentUser } from "../utils/auth";

const NotificationsPage = () => {
  const [tab, setTab] = useState(0);
  const [broadcasts, setBroadcasts] = useState([]);
  const [personals, setPersonals] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = getCurrentUser();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/notifications?userId=${user._id}`);
      const data = await res.json();
      const personal = data.filter((n) => !n.isBroadcast);
      const broadcast = data.filter((n) => n.isBroadcast);
      setBroadcasts(broadcast);
      setPersonals(personal);
      setLoading(false);
    };

    fetchData();
  }, [user._id]);

  if (loading) return <CircularProgress sx={{ m: 4 }} />;

  const renderList = (list) =>
    list.length === 0 ? (
      <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
        No notifications to show.
      </Typography>
    ) : (
      <List>
        {list.map((n) => (
          <React.Fragment key={n._id}>
            <ListItem alignItems="flex-start">
              <ListItemText
                primary={
                  <Typography variant="subtitle1" fontWeight="bold">
                    {n.title}
                  </Typography>
                }
                secondary={
                  <>
                    <Typography variant="body2">{n.body}</Typography>
                    {n.url && (
                      <Link
                        href={n.url}
                        target="_blank"
                        rel="noopener"
                        underline="hover"
                      >
                        Open Link
                      </Link>
                    )}
                    <Typography variant="caption" display="block" mt={0.5}>
                      {new Date(n.sentAt).toLocaleString()}
                    </Typography>
                  </>
                }
              />
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    );

  return (
    <Box className="notification-section">
      {/* <Typography variant="h5" gutterBottom>
        🛎️ Notifications
      </Typography> */}

      <Tabs
        value={tab}
        onChange={(e, newValue) => setTab(newValue)}
        indicatorColor="primary"
        textColor="primary"
        sx={{ mb: 2 }}
      >
        <Tab label="Broadcasts" />
        <Tab label="Personal" />
      </Tabs>

      {tab === 0 ? renderList(broadcasts) : renderList(personals)}
    </Box>
  );
};

export default NotificationsPage;
