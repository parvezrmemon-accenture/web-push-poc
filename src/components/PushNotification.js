import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import CancelIcon from "@mui/icons-material/Cancel";

const PushNotification = ({ userId }) => {
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
    if (Notification.permission === "denied") {
      alert(
        "You have blocked notifications. Please enable them in browser settings."
      );
      return;
    }

    const registration = await navigator.serviceWorker.ready;

    if (!registration.pushManager) {
      console.error("Push manager not supported.");
      return;
    }

    try {
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
          userId,
          subscription,
        }),
      });

      setSubscribed(true);
      alert("✅ Subscribed successfully!");
    } catch (err) {
      console.error("Subscription error:", err);
      alert("⚠️ Failed to subscribe.");
    }
  };

  const handleUnsubscribe = async () => {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();

    if (subscription) {
      const endpoint = subscription.endpoint; // <-- Extracting the endpoint - device specific token
      await subscription.unsubscribe();
      console.log("Unsubscribed from push notifications");

      await fetch("/api/unsubscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, endpoint }),
      });

      setSubscribed(false);
      alert("🚫 Unsubscribed successfully.");
    }
  };

  return (
    <Button
      variant="outlined"
      color="inherit"
      onClick={subscribed ? handleUnsubscribe : handleSubscribe}
      startIcon={subscribed ? <CancelIcon /> : <NotificationsActiveIcon />}
    >
      {subscribed ? "Unsubscribe" : "Subscribe"}
    </Button>
  );
};

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const raw = window.atob(base64);
  return Uint8Array.from([...raw].map((char) => char.charCodeAt(0)));
}

export default PushNotification;
