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
// alias['needsharebutton.m ``in.js'] = path.join(__dirname, 'needsharebutton.min.js');
// alias['needsharebutton.css'] = path.join(__dirname, 'needsharebutton.css');
// alias['font-awesome.css'] = path.join(__dirname, 'css/font-awesome.css');
// alias['needsharebutton.css'] = path.join(__dirname, 'needsharebutton.css');

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
  },
  chromeExtensionBoilerplate: {
    notHotReload: ["inject", "preinject", "background"],
    enableBackgroundAutoReload: true, // always true when "enableContentScriptsAutoReload" is set true
    enableContentScriptsAutoReload: true,
  },
  output: {
    path: path.join(__dirname, "build"),
    filename: "[name].bundle.js",
    clean: true,
    publicPath: "/",
    // filename: chunkData => {
    // 	return chunkData.chunk.name === "inject"
    // 		? "[name].bundle.js"
    // 		: "[name].[hash].bundle.js";
    // },
    // chunkFilename: "[name].[hash].bundle.js"
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
    new webpack.EnvironmentPlugin(["NODE_ENV"]),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "src/manifest.json",
          to: path.join(__dirname, "build"),
          force: true,
          transform: function (content) {
            // generates the manifest file using the package.json informations
            const json = {
              description: process.env.npm_package_description,
              version: process.env.npm_package_version,
              ...JSON.parse(content.toString()),
            };

            //   if (options.devtool === "cheap-module-eval-source-map") {
            //     json["content_security_policy"] = {
            //       extension_pages:
            //         "script-src 'self' 'unsafe-eval'; object-src 'self'",
            //     };
            //   }

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
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
      }),
    ],
  };
}

module.exports = options;
