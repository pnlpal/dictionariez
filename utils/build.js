var webpack = require("webpack"),
    config = require("../webpack.config");

delete config.chromeExtensionBoilerplate;
config.devtool = "source-map";

webpack(
  config,
  function (err) { if (err) throw err; }
);
