require("babel-register")({
  presets: ["es2015", "react"],
});
const router = require("./src/routes.js").default;
const Sitemap = require("react-router-sitemap").default;

new Sitemap(router).build("https://billeroo.de").save("./public/sitemap.xml");
