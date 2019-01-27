import rc from "rc";

type Configuration = {
  api: string;
  password?: string;
};

export default rc("variantlint", {
  api: "http://localhost:3000/"
}) as Configuration;
