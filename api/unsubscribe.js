import { deleteSubscriptionByEndpoint } from "../lib/db";

export default async function handler(req, res) {
  const { endpoint } = req.body;

  if (!endpoint) {
    return res.status(400).json({ error: "Missing data" });
  }

  try {
    const { endpoint } = req.body;
    await deleteSubscriptionByEndpoint(endpoint);
    res.status(200).json({ success: true });
  } catch (err) {
    console.error("❌ DB Save Error:", err);
    res.status(500).json({ error: "Failed to delete subscription" });
  }
}
