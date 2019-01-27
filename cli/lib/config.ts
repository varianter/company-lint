import rc from "rc";
import { Configuration } from "../index.d";

export default rc("companylint", {
  api: "http://localhost:3000/",
  set: false
}) as Configuration;
