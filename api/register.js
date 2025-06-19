import { getUserByUserName, registerUser } from "../lib/db";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Missing reqired fields" });
  }

  const userExists = await getUserByUserName(username);

  if (userExists) {
    return res
      .status(400)
      .json({ success: false, message: "User already exists" });
  }

  try {
    const user = await registerUser(req.body);
    const { password: _, ...safeUser } = user;

    res.status(200).json({ success: true, user: safeUser });
  } catch (err) {
    console.error("❌ Server Error: User Registration Failed ", err);
    res.status(500).json({ error: "User Registration Failed" });
  }
}
