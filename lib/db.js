import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";

const uri = process.env.MONGODB_URI;
const options = {};
let client;
let clientPromise;

if (!process.env.MONGODB_URI) {
  throw new Error("❌ MONGODB_URI not defined in environment");
}

if (!global._mongoClientPromise) {
  client = new MongoClient(uri, options);
  global._mongoClientPromise = client.connect();
}

clientPromise = global._mongoClientPromise;

export async function saveSubscription(userId, subscription) {
  const client = await clientPromise;
  const db = client.db();
  const coll = db.collection("subscriptions");

  await coll.updateOne(
    { userId, endpoint: subscription.endpoint },
    { $set: { userId, subscription } },
    { upsert: true }
  );
}

export async function getAllSubscriptions() {
  const client = await clientPromise;
  const db = client.db();
  const coll = db.collection("subscriptions");
  const results = await coll.find().toArray();
  return results.map((doc) => doc.subscription);
}

export async function getSubscriptionsByUserIds(userIds) {
  const client = await clientPromise;
  const db = client.db();
  const coll = db.collection("subscriptions");

  const docs = await coll.find({ userId: { $in: userIds } }).toArray();
  return docs.map((doc) => doc.subscription);
}

// ⬇️ Unsubscribe by userId
export async function deleteSubscriptionsByUserId(userId) {
  const client = await clientPromise;
  const db = client.db();
  const coll = db.collection("subscriptions");

  const result = await coll.deleteMany({ userId });
  return result.deletedCount;
}

// Unsubscribe by endpoint (device-specific)
export async function deleteSubscriptionByEndpoint(endpoint) {
  const client = await clientPromise;
  const db = client.db();
  const coll = db.collection("subscriptions");

  const result = await coll.deleteOne({ "subscription.endpoint": endpoint });
  return result.deletedCount;
}

export async function getUserByUserName(username) {
  const client = await clientPromise;
  const db = client.db();
  return await db.collection("users").findOne({ username });
}

export async function registerUser(body) {
  const client = await clientPromise;
  const db = client.db();

  const { username, password } = body;

  return await db.collection("users").insertOne({
    username,
    password: bcrypt.hashSync(password, 10),
  });
}

export async function getUsers() {
  const client = await clientPromise;
  const db = client.db();

  return await db
    .collection("users")
    .find({}, { projection: { password: 0 } })
    .toArray();
}
