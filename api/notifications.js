import { getUserNotifications } from "../lib/db";

export default async function handler(req, res) {
  const { userId } = req.query;

  if (!userId) return res.status(400).json({ error: "Missing userId" });

  try {
    const data = await getUserNotifications(userId);
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ error: "Failed to fetch notifications" });
  }
}
