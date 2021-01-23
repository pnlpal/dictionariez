var webpack = require("webpack"),
	path = require("path"),
	fileSystem = require("fs"),
	env = require("./utils/env"),
	CleanWebpackPlugin = require("clean-webpack-plugin"),
	CopyWebpackPlugin = require("copy-webpack-plugin"),
	HtmlWebpackPlugin = require("html-webpack-plugin"),
	WriteFilePlugin = require("write-file-webpack-plugin");

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
	"woff2"
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
		background: path.join(__dirname, "src", "background", "main.coffee"),
		examples: path.join(__dirname, "src", "other", "example.coffee"),
		share: path.join(__dirname, "src", "other", "share.coffee")
	},
	chromeExtensionBoilerplate: {
		notHotReload: ["inject"]
	},
	output: {
		path: path.join(__dirname, "build"),
		filename: "[name].bundle.js"
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
				loader: "style-loader!css-loader"
				// exclude: /node_modules/
			},
			{
				test: /\.less$/,
				use: [
					{
						loader: "style-loader" // creates style nodes from JS strings
					},
					{
						loader: "css-loader" // translates CSS into CommonJS
					},
					{
						loader: "less-loader" // compiles Less to CSS
					}
				]
			},
			{
				test: new RegExp(".(" + fileExtensions.join("|") + ")$"),
				loader: "file-loader?name=[name].[ext]"
				// exclude: /node_modules/
			},
			{
				test: /\.html$/,
				loader: "html-loader",
				exclude: /node_modules/
			},
			{
				test: /\.coffee$/,
				loader: "coffee-loader"
			}
		]
	},
	resolve: {
		alias: alias
	},
	plugins: [
		// clean the build folder
		new CleanWebpackPlugin(["build"]),
		// expose and write the allowed env vars on the compiled bundle
		new webpack.EnvironmentPlugin(["NODE_ENV"]),
		new CopyWebpackPlugin([
			{
				from: "src/manifest.json",
				transform: function(content) {
					// generates the manifest file using the package.json informations
					const json = {
						description: process.env.npm_package_description,
						version: process.env.npm_package_version,
						...JSON.parse(content.toString())
					};

					if (options.devtool === "cheap-module-eval-source-map") {
						json["content_security_policy"] =
							"script-src 'self' 'unsafe-eval'; object-src 'self'";
					}

					return Buffer.from(JSON.stringify(json));
				}
			},
			{
				from: "src/images",
				to: "images"
			}
		]),
		// new HtmlWebpackPlugin({
		//     template: path.join(__dirname, "src", "popup.html"),
		//     filename: "popup.html",
		//     chunks: ["popup"]
		// }),
		new HtmlWebpackPlugin({
			template: path.join(__dirname, "src", "options.html"),
			filename: "options.html",
			chunks: ["options"]
		}),
		new HtmlWebpackPlugin({
			template: path.join(__dirname, "src", "background.html"),
			filename: "background.html",
			chunks: ["background"]
		}),
		new HtmlWebpackPlugin({
			template: path.join(__dirname, "src", "dict.html"),
			filename: "dict.html",
			chunks: ["dictheader"]
		}),
		new HtmlWebpackPlugin({
			template: path.join(__dirname, "src", "card.html"),
			filename: "card.html",
			chunks: ["card"]
		}),
		new HtmlWebpackPlugin({
			template: path.join(__dirname, "src", "examples.html"),
			filename: "examples.html",
			chunks: ["examples"]
		}),
		new HtmlWebpackPlugin({
			template: path.join(__dirname, "src", "share.html"),
			filename: "share.html",
			chunks: ["share"]
		}),

		new webpack.ProvidePlugin({
			jQuery: "jquery"
		}),

		new WriteFilePlugin()
	]
};

module.exports = options;
