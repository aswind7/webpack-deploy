const merge = require('webpack-merge');
const common = require('./webpack.common.config.js');
const webpack = require('webpack');

module.exports = merge(common, {
	devtool: 'inline-source-map',
	devServer: {
		contentBase: './dist',
		hot: true // hmr
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin()
	]
});