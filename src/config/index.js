import local from "./local";

export default () => {
  if (process.env == "production") {
    return null;
  }
  return local;
};
