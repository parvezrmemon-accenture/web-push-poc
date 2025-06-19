import fs from "fs";
import path from "path";

const dirPath = path.resolve(".vercel/tmp");
const filePath = path.join(dirPath, "subscriptions.json");

export function saveSubscription(subscription) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  let subs = [];

  try {
    if (fs.existsSync(filePath)) {
      subs = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    }
  } catch (err) {
    console.error("Error reading file:", err);
  }

  if (!subs.find((s) => s.endpoint === subscription.endpoint)) {
    subs.push(subscription);
    fs.writeFileSync(filePath, JSON.stringify(subs, null, 2));
  }
}

export function getAllSubscriptions() {
  try {
    if (fs.existsSync(filePath)) {
      return JSON.parse(fs.readFileSync(filePath, "utf-8"));
    }
  } catch (err) {
    console.error("Failed reading file:", err);
  }
  return [];
}

export function removeAllSubscriptions() {
  if (fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, "[]");
  }
}
