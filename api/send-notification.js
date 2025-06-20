import { getAllSubscriptions } from "../lib/db";
import webpush from "web-push";

webpush.setVapidDetails(
  "mailto:you@example.com",
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

export default async function handler(req, res) {
  const payload = JSON.stringify({
    title: "🚀 Hello!",
    body: "Click on this to open chat",
    url: "/chat", // this will be used on click
  });

  try {
    const subs = await getAllSubscriptions();

    if (!subs.length) {
      return res.status(200).json({ message: "No subscribers" });
    }

    await Promise.all(
      subs.map((sub) =>
        webpush.sendNotification(sub, payload).catch((err) => {
          console.error("❌ Push failed:", err);
        })
      )
    );

    res.status(200).json({ success: true });
  } catch (err) {
    console.error("❌ Notification send error:", err);
    res.status(500).json({ error: "Push failed" });
  }
}
