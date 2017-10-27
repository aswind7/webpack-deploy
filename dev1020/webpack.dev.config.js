const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
	entry: {
		app: "./src/index.js"
	},
	module: {
		rules: [{
			test: /\.css$/,
			use: ["style-loader", "css-loader"]
		}]
	},
	output: {
		filename: "[name].bundle.js",
		path: path.resolve(__dirname, "dist")
	}
};