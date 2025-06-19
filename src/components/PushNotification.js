import React, { useState, useEffect } from "react";
import { Button, Stack } from "@mui/material";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import CancelIcon from "@mui/icons-material/Cancel";

const PushNotification = () => {
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    checkSubscription();
  }, []);

  const checkSubscription = async () => {
    const registration = await navigator.serviceWorker.ready;
    const existing = await registration.pushManager.getSubscription();
    setSubscribed(!!existing);
  };

  const handleSubscribe = async () => {
    const registration = await navigator.serviceWorker.ready;

    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(
        "BDxAaa9fKmRrH2lqWovsd_Izbfwi4148iPh19sVSt84Vys4CqsWkaibRxgAKgTlJNRwjvAw6SX8ceyTmrc3Er7Q"
      ),
    });

    console.log("Subscribed:", subscription);

    await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: "user123",
        subscription,
      }),
    });

    setSubscribed(true);
  };

  const handleUnsubscribe = async () => {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();

    if (subscription) {
      await subscription.unsubscribe();
      console.log("Unsubscribed from push notifications");

      // Optional: Inform your backend to remove subscription
      await fetch("/api/unsubscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: "user123" }),
      });

      setSubscribed(false);
    }
  };

  return (
    <Stack spacing={2} alignItems="center">
      <Button
        variant="contained"
        onClick={subscribed ? handleUnsubscribe : handleSubscribe}
        startIcon={subscribed ? <CancelIcon /> : <NotificationsActiveIcon />}
        sx={{
          backgroundColor: subscribed ? "#ffffff" : "#ffffff",
          color: subscribed ? "#d32f2f" : "#1976d2",
          px: 2.5,
          py: 1.2,
          fontWeight: "bold",
          borderRadius: 2,
          textTransform: "none",
          boxShadow: 1,
          "&:hover": {
            backgroundColor: subscribed ? "#f9e0e0" : "#e0e0e0",
          },
        }}
      >
        {subscribed ? "Unsubscribe" : "Subscribe to Notifications"}
      </Button>
    </Stack>
  );
};

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const raw = window.atob(base64);
  return Uint8Array.from([...raw].map((char) => char.charCodeAt(0)));
}

export default PushNotification;
