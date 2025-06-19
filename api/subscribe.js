import { saveSubscription } from "../lib/db";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { subscription } = req.body;
  if (!subscription?.endpoint)
    return res.status(400).json({ error: "Invalid subscription" });

  saveSubscription(subscription);
  console.log("Subscription saved:", subscription.endpoint);
  res.status(200).json({ success: true });
}
