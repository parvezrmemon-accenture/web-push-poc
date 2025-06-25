import bcrypt from "bcryptjs";
import { getUserByUserName } from "../lib/db";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ success: false, message: "Missing fields" });
  }

  try {
    const user = await getUserByUserName(username);
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid username or password" });
    }

    // Exclude password from user object
    const { password: _, ...safeUser } = user;

    res.status(200).json({ success: true, user: safeUser });
  } catch (err) {
    console.error("❌ Server Error:", err);
    res.status(500).json({ error: "Failed to login" });
  }
}
