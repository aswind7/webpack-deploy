const merge = require('webpack-merge');
const common = require('./webpack.common.config.js');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const ExtractCSS = new ExtractTextPlugin('css/styles.[contenthash].css');
const ExtractLESS = new ExtractTextPlugin('css/styles-by-less.[contenthash].css');

//手动merge 提取css
common.module.rules = [
	{
		test: /\.(html)$/,
		use: {
			loader: 'html-loader',
			options: {
				attrs: ['img:src']
			}
		}
	},
	{
		test: /\.less/,
		use: ExtractTextPlugin.extract({
			fallback: 'style-loader',
			use: ['css-loader', 'postcss-loader', 'less-loader']
		})
	},
	{
		test: /\.css$/,
		use: ExtractTextPlugin.extract({
			fallback: 'style-loader',
			use: ['css-loader', 'postcss-loader']
		})
	},
	{
		test: /\.(png|svg|jpg|jpeg|gif)$/,
		use: [
			{
				loader: 'file-loader',
				options: {
					name: 'img/[name].[hash].[ext]'
				}
			}
		]
	},
	{
		test: /\.js$/,
		exclude: /(node_modules|bower_components)/,
		use: {
			loader: 'babel-loader'
		}
	}
];

module.exports = merge(common, {
	// plugins: [new UglifyJSPlugin(), ExtractCSS, ExtractLESS],
	plugins: [new UglifyJSPlugin(), new ExtractTextPlugin('css/styles.[contenthash].css')],
	output: {
		// publicPath: '/static/', //服务器上线的资源路径，需要添加前缀
	}
});
