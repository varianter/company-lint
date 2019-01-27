import connect from "./connect-api";
import config from "./config";

const api = connect(config);

export const latest = api.latest;
export const all = api.all;
export const add = api.add;
