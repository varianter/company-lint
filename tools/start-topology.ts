import { createServer, IncomingMessage, ServerResponse } from "http";
import { createError, createOut } from "../api-lib/api";
import { dirname, resolve } from "path";
import glob from "glob";

type Handler = (req: IncomingMessage, res: ServerResponse) => Promise<void>;
type ApiEndpoint = {
  path: string;
  file: string;
  handler: Handler;
};

function enpoints() {
  return new Promise<string[]>(function(res, rej) {
    glob("./api/*/index.ts", function(err, files) {
      if (err) return rej(err);
      res(files);
    });
  });
}

function cleanEndpoint(endpoint: string): string {
  return dirname(endpoint).replace(/^\./, "");
}

async function createApi(): Promise<ApiEndpoint[]> {
  const e = await enpoints();
  return Promise.all(
    e.map(async function(i: string) {
      const resolvedPath = resolve(__dirname, "..", i);
      return {
        path: cleanEndpoint(i),
        file: resolvedPath,
        handler: (await import(resolvedPath)).default as Handler
      };
    })
  );
}

async function start() {
  const api = await createApi();
  logApi(api);

  createServer(function(req: IncomingMessage, res: ServerResponse) {
    const hit = api.find(i => i.path === req.url);

    if (!hit) {
      const error = createError(res, createOut(res));
      return error(404, { error: "Not found." });
    }

    return hit.handler(req, res);
  }).listen(3000, function() {
    console.log("Started topology on http://localhost:3000/");
  });
}

start();

type Fn<T, G> = (...args: T[]) => G;
const unary = <T, G>(fn: Fn<T, G>) => (arg: T) => fn(arg);

function logApi(api: ApiEndpoint[]): void {
  console.log("Starting topology with API:");
  api.map(i => i.path).forEach(unary(console.log));
}
