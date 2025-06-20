import { getUsers } from "../lib/db";

export default async function handler(req, res) {
  try {
    const users = await getUsers();
    res.status(200).json(users);
  } catch (err) {
    console.error("❌ Error while fetching users:", err);
    res.status(500).json({ error: "Error while fetching users" });
  }
}
