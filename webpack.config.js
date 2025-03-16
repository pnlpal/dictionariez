var webpack = require("webpack"),
  path = require("path"),
  fileSystem = require("fs"),
  env = require("./utils/env"),
  { CleanWebpackPlugin } = require("clean-webpack-plugin"),
  CopyWebpackPlugin = require("copy-webpack-plugin"),
  HtmlWebpackPlugin = require("html-webpack-plugin"),
  // WriteFilePlugin = require("write-file-webpack-plugin"),
  TerserPlugin = require("terser-webpack-plugin");

// load the secrets
var alias = {};

var secretsPath = path.join(__dirname, "secrets." + env.NODE_ENV + ".js");

var fileExtensions = [
  "jpg",
  "jpeg",
  "png",
  "gif",
  "eot",
  "otf",
  "svg",
  "ttf",
  "woff",
  "woff2",
];

if (fileSystem.existsSync(secretsPath)) {
  alias["secrets"] = secretsPath;
}
alias.utils = path.join(__dirname, "src/utils.coffee");

var options = {
  mode: process.env.NODE_ENV || "development",
  entry: {
    // popup: path.join(__dirname, "src", "js", "popup.js"),
    inject: path.join(__dirname, "src", "content", "inject.coffee"),
    preinject: path.join(__dirname, "src", "content", "preinject.coffee"),
    dictheader: path.join(__dirname, "src", "content", "dictheader.coffee"),
    card: path.join(__dirname, "src", "content", "card.coffee"),
    options: path.join(__dirname, "src", "option", "option.coffee"),
    background: path.join(__dirname, "src", "background", "main.js"),
    examples: path.join(__dirname, "src", "other", "example.coffee"),
    share: path.join(__dirname, "src", "other", "share.coffee"),
    speak: path.join(__dirname, "src", "other", "speak.js"),
    test: path.join(__dirname, "src", "other", "test.js"),
    privacy: path.join(__dirname, "src", "other", "privacy-consent.js"),
  },
  chromeExtensionBoilerplate: {
    enableBackgroundAutoReload: true, // always true when "enableContentScriptsAutoReload" is set true
    enableContentScriptsAutoReload: true,
  },
  output: {
    path: path.join(__dirname, "build"),
    filename: "[name].bundle.js",
    clean: true,
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: "style-loader", // creates style nodes from JS strings
          },
          {
            loader: "css-loader", // translates CSS into CommonJS
          },
          {
            loader: "less-loader", // compiles Less to CSS
          },
        ],
      },
      {
        test: new RegExp(".(" + fileExtensions.join("|") + ")$"),
        type: "asset/resource",
        exclude: /node_modules/,
      },
      {
        test: /\.html$/,
        loader: "html-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.coffee$/,
        loader: "coffee-loader",
      },
      {
        test: require.resolve("jquery"),
        use: [
          {
            loader: "expose-loader",
            options: {
              exposes: [
                {
                  globalName: "$",
                  override: true,
                },
                {
                  globalName: "jQuery",
                  override: true,
                },
              ],
            },
          },
        ],
      },
    ],
  },
  resolve: {
    alias: alias,
  },
  plugins: [
    // clean the build folder
    new CleanWebpackPlugin({ verbose: false }),
    new webpack.ProgressPlugin(),
    // expose and write the allowed env vars on the compiled bundle
    new webpack.EnvironmentPlugin(["NODE_ENV", "UNIT_TEST", "PRODUCT"]),
    new CopyWebpackPlugin({
      patterns: [
        {
          from:
            env.PRODUCT === "SidePal"
              ? "src/manifest.sidepal.json"
              : "src/manifest.json",
          to: path.join(__dirname, "build", "manifest.json"),
          force: true,
          transform: function (content) {
            // generates the manifest file using the package.json informations
            const json = {
              description: process.env.npm_package_description,
              version: process.env.npm_package_version,
              ...JSON.parse(content.toString()),
            };
            if (env.BROWSER === "Firefox") {
              json.name = "SidePal: Your Language Ally in Side Panel";
              json.manifest_version = 2; // Firefox has host permission issue with manifest v3
              json.browser_action = json.action;
              delete json.action;
              delete json.minimum_chrome_version;
              delete json.host_permissions;
              json["browser_specific_settings"] = {
                gecko: {
                  id:
                    env.PRODUCT === "SidePal"
                      ? "revir.qing_sidepal@gmail.com"
                      : "revir.qing@gmail.com",
                  strict_min_version: "109.0",
                },
              };
              json.background = {
                scripts: ["background.bundle.js"],
              };
              json.permissions = json.permissions.filter(
                (x) => x !== "offscreen" && x !== "sidePanel"
              );
              json.permissions.push("<all_urls>");
              json["web_accessible_resources"] = [
                "*.js",
                "*.json",
                "*.html",
                "fonts/*",
              ];
              if (env.PRODUCT === "SidePal") {
                json["sidebar_action"] = {
                  default_title: "SidePal",
                  default_panel: "dict.html",
                  default_icon: "images/library-128.png",
                };
              }
            }
            if (env.NODE_ENV === "development") {
              if (env.BROWSER === "Firefox") {
                json.web_accessible_resources.push("*.js.map");
              } else {
                json.web_accessible_resources[0].resources.push("*.js.map");
              }
            }

            return Buffer.from(JSON.stringify(json));
          },
        },
      ],
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "src/images",
          to: path.join(__dirname, "build/images"),
          force: true,
        },
      ],
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "privacy-consent.html"),
      filename: "privacy-consent.html",
      chunks: ["privacy"],
      cache: false,
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "options.html"),
      filename: "options.html",
      chunks: ["options"],
      cache: false,
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "dict.html"),
      filename: "dict.html",
      chunks: ["dictheader"],
      cache: false,
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "card.html"),
      filename: "card.html",
      chunks: ["card"],
      cache: false,
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "examples.html"),
      filename: "examples.html",
      chunks: ["examples"],
      cache: false,
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "share.html"),
      filename: "share.html",
      chunks: ["share"],
      cache: false,
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "offscreen.html"),
      filename: "offscreen.html",
      chunks: ["speak"],
      cache: false,
    }),

    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "test.html"),
      filename: "test.html",
      chunks: ["test"],
      cache: false,
    }),
  ],
  infrastructureLogging: {
    level: "info",
  },
};

if (env.NODE_ENV === "development") {
  console.log("Run in dev");
  options.devtool = "cheap-module-source-map";
} else {
  console.log("Run in prod");
  options.optimization = {
    minimize: env.BROWSER === "Firefox" ? false : true,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
      }),
    ],
  };
}

module.exports = options;
