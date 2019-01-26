// import prompts from "prompts";
import { latest, all } from "./api";

async function start() {
  const l = await latest();
  const a = await all();

  console.log("Latest", l);
  console.log("\nAll", a);
}

start();
