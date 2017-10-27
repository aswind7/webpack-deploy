const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
// import style from './src/css/style.css'

module.exports = {
	entry: {
		app: './src/js/total.js'
	},
	module: {
		rules: [
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
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
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
		]
	},
	plugins: [
		new CleanWebpackPlugin(['dist']),
		new HtmlWebpackPlugin({
			title: 'index title',
			filename: 'foo-test.html'
		}),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: 'src/template/index.html'
		})
	],
	output: {
		path: path.resolve(__dirname, 'dist/'),
		filename: 'js/[name].bundle.js'
	}
};
