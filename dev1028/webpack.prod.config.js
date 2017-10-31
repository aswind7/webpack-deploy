const merge = require('webpack-merge');
const common = require('./webpack.common.config.js');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ExtractCSS = new ExtractTextPlugin('css/styles.[contenthash].css');
const ExtractLESS = new ExtractTextPlugin('css/styles-by-less.[contenthash].css');

module.exports = merge.smart(common, {
	// plugins: [new UglifyJSPlugin(), ExtractCSS, ExtractLESS],
	plugins: [new UglifyJSPlugin(), new ExtractTextPlugin('css/styles.[contenthash].css')],
	output: {
		// publicPath: '/static/', //服务器上线的资源路径，需要添加前缀
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader', 'postcss-loader']
				})
			},
			{
				test: /\.less/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader', 'postcss-loader', 'less-loader']
				})
			}
		]
	}
});
