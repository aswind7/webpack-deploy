const merge = require('webpack-merge');
const common = require('./webpack.common.config.js');
const webpack = require('webpack');

module.exports = merge.smart(common, {
	devtool: 'inline-source-map',
	devServer: {
		contentBase: './dist',
		//host: '127.0.0.1',
	    host: '0.0.0.0',
		hot: true, // hmr
		proxy: {
			'/API': {
				target: 'http://test.htexam.net/API',
				"pathRewrite": {
					"/API": ""
				  },
				changeOrigin: true
			}
		}
	},
	module: {
		rules: [
			// 热重载策略 样式
			{
				test: /\.less$/,
				use: [
					{
						loader: 'style-loader' // creates style nodes from JS strings
					},
					{
						loader: 'css-loader' // translates CSS into CommonJS
					},
					{
						loader: 'postcss-loader'
					},
					{
						loader: 'less-loader'
					}
				]
			},
			{
				test: /\.css$/,
				use: [
					{
						loader: 'style-loader' // creates style nodes from JS strings
					},
					{
						loader: 'css-loader' // translates CSS into CommonJS
					},
					{
						loader: 'postcss-loader'
					}
				]
			}
		]
	},
	plugins: [new webpack.HotModuleReplacementPlugin()]
});
