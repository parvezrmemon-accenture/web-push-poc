import webpush from "web-push";
import { getAllSubscriptions } from "../lib/db";

webpush.setVapidDetails(
  "mailto:test@example.com",
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const payload = JSON.stringify({
    title: "🎉 Hello from Vercel!",
    body: "You just received a push notification",
  });

  const subscriptions = getAllSubscriptions();
  const results = [];

  for (const sub of subscriptions) {
    try {
      await webpush.sendNotification(sub, payload);
      results.push({ endpoint: sub.endpoint, status: "sent" });
    } catch (err) {
      results.push({
        endpoint: sub.endpoint,
        status: "failed",
        error: err.message,
      });
      console.error("Push failed for:", sub.endpoint, err.message);
    }
  }

  res.status(200).json({ results });
}
