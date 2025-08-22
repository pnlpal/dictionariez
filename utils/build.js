/* eslint-env node */

process.env.NODE_ENV = "production";

var webpack = require("webpack"),
    config = require("../webpack.config");

delete config.chromeExtensionBoilerplate;

webpack(config, function (err, stats) {
    if (err) {
        console.error(err.stack || err);
        if (err.details) {
            console.error(err.details);
        }
        return;
    }

    const info = stats.toJson();

    if (stats.hasErrors()) {
        console.error(info.errors);
    }

    if (stats.hasWarnings()) {
        console.warn(info.warnings);
    }

    // Log result...
    console.log(
        stats.toString({
            chunks: false, // Makes the build much quieter
            colors: true, // Shows colors in the console
        })
    );
});
