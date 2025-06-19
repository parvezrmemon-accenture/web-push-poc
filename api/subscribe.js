import webpush from "web-push";

let subscriptions = global.subscriptions || [];

if (!global.subscriptions) {
  global.subscriptions = subscriptions;
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { subscription, userId } = req.body;

  // avoid duplicates
  const exists = subscriptions.find(
    (s) => s.endpoint === subscription.endpoint
  );
  if (!exists) {
    subscriptions.push(subscription);
    console.log(`Added subscription for user ${userId}`);
  }

  return res.status(200).json({ success: true });
}
