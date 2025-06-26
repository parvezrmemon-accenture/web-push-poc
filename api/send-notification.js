import {
  getAllSubscriptions,
  getSubscriptionsByUserIds,
  saveNotification,
} from "../lib/db";
import webpush from "web-push";

webpush.setVapidDetails(
  "mailto:you@example.com",
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { userIds, title, body, url, adminId } = req.body;

  const fallbackTitle = "📢 New Notification";
  const fallbackBody = "You have a new update!";
  const fallbackUrl = "/";

  try {
    const isBroadcast = userIds ? false : true;

    const subs = isBroadcast
      ? await getAllSubscriptions()
      : await getSubscriptionsByUserIds(userIds);

    if (!subs.length) {
      return res.status(200).json({ message: "No subscribers" });
    }

    const payload = JSON.stringify({
      title: title || fallbackTitle,
      body: body || fallbackBody,
      url: url || fallbackUrl,
    });

    await Promise.all(
      subs.map((sub) =>
        webpush.sendNotification(sub, payload).catch((err) => {
          console.error("❌ Push failed:", err);
        })
      )
    );

    await saveNotification({
      title,
      body,
      url,
      isBroadcast,
      sentTo: userIds,
      createdBy: adminId,
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Push send error", error);
    res.status(500).json({ error: "Failed to send push" });
  }
}
