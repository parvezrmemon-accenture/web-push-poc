import { saveSubscription } from "../lib/db";

export default async function handler(req, res) {
  const { userId, subscription } = req.body;

  if (!subscription || !userId) {
    return res.status(400).json({ error: "Missing data" });
  }

  try {
    await saveSubscription(userId, subscription);
    res.status(200).json({ success: true });
  } catch (err) {
    console.error("❌ DB Save Error:", err);
    res.status(500).json({ error: "Failed to save subscription" });
  }
}
