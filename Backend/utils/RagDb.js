import mongoose from "mongoose";

export default async function getCollection(collectionName) {
  const { db } = mongoose.connection;

  if (!db) {
    throw new Error("Database connection is not established");
  }
  return db.collection(collectionName);
}
