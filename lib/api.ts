import { createServer, IncomingMessage, ServerResponse } from "http";
import { getCollection, Collection } from "./connection";

type OutFunc<T> = (data: T) => void;
type Handler<G, T> = (
  out: OutFunc<T>,
  collection: Collection<G>,
  http: {
    req: IncomingMessage;
    res: ServerResponse;
    error: <T>(code: number, obj: T) => void;
  }
) => Promise<void>;

function compose<T, G, D>(f: ((arg: G) => D), g: ((arg: T) => G)) {
  return (arg: T) => f(g(arg));
}

export function json<G, T>(handler: Handler<G, T>) {
  // Inner handler opening and closing connection to mongo.
  async function innerHandler(req: IncomingMessage, res: ServerResponse) {
    res.writeHead(200, { "Content-Type": "application/json" });
    const out = compose(
      res.end.bind(res),
      JSON.stringify
    );
    const error = <T>(code: number, obj: T) => {
      res.writeHead(code, { "Content-Type": "application/json" });
      return out(obj);
    };
    const { collection, client } = await getCollection<G>();

    await handler(out, collection, { req, res, error });

    if (process.env.IS_NOW) {
      console.log("Closing");
      client.close();
    }
  }

  // For running endpoint locally
  if (!process.env.IS_NOW) {
    createServer(innerHandler).listen(3000, function() {
      console.log("Started local server at http://localhost:3000");
    });
  }

  return innerHandler;
}

export async function jsonBody(request: IncomingMessage) {
  let body: Uint8Array[] = [];

  return new Promise(function(res, rej) {
    request
      .on("data", body.push.bind(body))
      .on("error", rej)
      .on("end", () => {
        res(JSON.parse(Buffer.concat(body).toString()));
      });
  });
}
