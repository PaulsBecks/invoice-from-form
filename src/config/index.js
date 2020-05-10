import local from "./local";
import production from "./production";

export default () => {
  if (process.env == "production") {
    return production;
  }
  return local;
};
