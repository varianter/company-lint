import rc from "rc";
import { Configuration } from "../index.d";

export default rc("variantlint", {
  api: "http://localhost:3000/"
}) as Configuration;
