require("dotenv").config();
import { createServer, IncomingMessage, ServerResponse } from "http";
import { getCollection, Collection } from "./connection";

const PASSWORD = process.env.ACCESS_TOKEN;

type OutFunc<T> = (data: T) => void;
type ErrorFunc<T> = (code: number, data: T) => void;
type Handler<G, T> = (
  out: OutFunc<T>,
  collection: Collection<G>,
  http: {
    req: IncomingMessage;
    res: ServerResponse;
    error: ErrorFunc<T>;
  }
) => Promise<void>;

function compose<T, G, D>(f: ((arg: G) => D), g: ((arg: T) => G)) {
  return (arg: T) => f(g(arg));
}

export function createOut<T>(res: ServerResponse): OutFunc<T> {
  return compose(
    res.end.bind(res),
    JSON.stringify
  );
}

export function createError<T>(
  res: ServerResponse,
  out: OutFunc<T>
): ErrorFunc<T> {
  return (code: number, obj: T) => {
    res.writeHead(code, { "Content-Type": "application/json" });
    return out(obj);
  };
}

export function json<G, T>(handler: Handler<G, T>) {
  // Inner handler opening and closing connection to mongo.
  async function innerHandler(req: IncomingMessage, res: ServerResponse) {
    res.writeHead(200, { "Content-Type": "application/json" });
    const out = createOut(res);
    const error = createError(res, out);
    const collection = await getCollection<G>();
    await handler(out, collection, { req, res, error });
  }

  // For running standalone endpoint locally
  if (!process.env.IS_NOW && !process.env.IS_TOPOLOGY_STARTER) {
    createServer(innerHandler).listen(3000, function() {
      console.log("Started local server at http://localhost:3000");
    });
  }

  return innerHandler;
}

export function jsonSecured<G, T>(handler: Handler<G, T>) {
  return json<G, T>(function(out, collection, http) {
    if (PASSWORD) {
      validateAuthorization(PASSWORD, http.req, http.res);
    }

    return handler(out, collection, http);
  });
}

export async function jsonBody<T>(request: IncomingMessage) {
  let body: Uint8Array[] = [];

  return new Promise<T>(function(res, rej) {
    request
      .on("data", body.push.bind(body))
      .on("error", rej)
      .on("end", () => {
        res(JSON.parse(Buffer.concat(body).toString()));
      });
  });
}

function validateAuthorization(
  token: string,
  req: IncomingMessage,
  res: ServerResponse
) {
  const error = createError(res, createOut(res));
  const noAccess = () => error(401, { error: "No access." });

  if (!req.headers || !req.headers.authorization) {
    return noAccess();
  }

  const parts = req.headers.authorization
    .replace(/\s+/g, " ")
    .trim()
    .split(" ");

  if (parts.length !== 2 || parts[0] !== "Bearer" || parts[1] !== token) {
    return noAccess();
  }
}
