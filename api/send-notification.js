import webpush from "web-push";

let subscriptions = global.subscriptions || [];

if (!global.subscriptions) {
  global.subscriptions = subscriptions;
}

webpush.setVapidDetails(
  "mailto:test@example.com",
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const payload = JSON.stringify({
    title: "Hello from Vercel!",
    body: "You received this push notification 🎉",
  });

  const results = await Promise.allSettled(
    subscriptions.map((sub) => webpush.sendNotification(sub, payload))
  );

  const failed = results.filter((r) => r.status === "rejected").length;
  console.log(`Sent notifications. Failed: ${failed}`);

  return res.status(200).json({ success: true, failed });
}
