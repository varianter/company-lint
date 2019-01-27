import runLint from "./commands/lint";
import runLatest from "./commands/latest";
import yargs from "yargs";

yargs
  .command({
    command: "latest",
    describe: "Get latest lint report",
    handler: syncify(runLatest)
  })
  .command({
    command: "$0",
    describe: "Run lint",
    handler: syncify(runLint)
  })
  .help().argv;

function syncify<T>(fn: () => Promise<T>): () => void {
  return function() {
    fn().catch(function(e) {
      console.error(e);
    });
  };
}
