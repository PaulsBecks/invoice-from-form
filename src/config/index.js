import local from "./local";
import production from "./production";

export default () => {
  if (process.env.NODE_ENV === "production") {
    return production;
  }
  return local;
};
