require("dotenv").config();
import { MongoClient, Collection } from "mongodb";

if (!process.env.DB_CONNECTION_STRING) {
  throw new Error("missing DB_CONNECTION_STRING");
}
if (!process.env.DB_DATABASE_NAME) {
  throw new Error("missing DB_DATABASE_NAME");
}

const dbStringUri = process.env.DB_CONNECTION_STRING;
const dbName = process.env.DB_DATABASE_NAME;
const collectionName = "lints";

const client = new MongoClient(dbStringUri, { useNewUrlParser: true });

export async function getCollection<T>() {
  if (!client.isConnected()) {
    console.log("Connecting");
    await client.connect();
  }
  const db = client.db(dbName);

  return db.collection<T>(collectionName);
}

export type Collection<T> = Collection<T>;
