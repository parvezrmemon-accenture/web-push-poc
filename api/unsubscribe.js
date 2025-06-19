import { removeAllSubscriptions } from "../lib/db";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  removeAllSubscriptions();
  console.log("All subscriptions removed.");
  res.status(200).json({ success: true });
}
