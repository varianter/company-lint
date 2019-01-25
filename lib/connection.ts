require("dotenv").config();
import { MongoClient, Collection } from "mongodb";

if (!process.env.DB_CONNECTION_STRING) {
  throw new Error("missing DB_CONNECTION_STRING");
}

const dbStringUri = process.env.DB_CONNECTION_STRING;
const dbName = "variant-lint";
const collectionName = "lints";

const client = new MongoClient(dbStringUri, { useNewUrlParser: true });

export async function getCollection<T>() {
  if (!client.isConnected()) {
    console.log("Connecting");
    await client.connect();
  }
  const db = client.db(dbName);

  return {
    collection: db.collection<T>(collectionName),
    client
  };
}

export type Collection<T> = Collection<T>;
