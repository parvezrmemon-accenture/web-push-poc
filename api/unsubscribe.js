let subscriptions = global.subscriptions || [];

if (!global.subscriptions) {
  global.subscriptions = subscriptions;
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { userId } = req.body;

  // Optional logic: remove by user ID if stored, here we clear all for simplicity
  subscriptions = [];
  global.subscriptions = subscriptions;

  console.log(`Unsubscribed user ${userId}`);
  return res.status(200).json({ success: true });
}
