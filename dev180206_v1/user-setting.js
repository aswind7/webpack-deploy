const fs = require('fs');
const path = require('path');

/**
 * 获取html源文件
 * @return {Array}	[ 'index.html', 'test.html' ]
 */
const getAllHTMLFiles = () => {
	let dir = fs.readdirSync('./src/template/');
	const r = dir.filter(el => {
		return /\.html/.test(el);
	});
	return r;
};

/**
 * 获取webpack 所需的html模板对象
 * @param {Object} obj1 事件对象
 * @return {Array}  [ { template: 'src/template/index.html' },{ template: 'src/template/test.html' } ]
 */
const get_webpack_html_files = () => {
	const files = getAllHTMLFiles();
	let dealed_files = [];
	files.forEach(el => {
		dealed_files.push({
			filename: el, //生成的文件名
			template: path.join('src/template/', el),
			minify: false
		});
	});
	return dealed_files;
};

/**
 * 为webpack设置增加html插件
 * @param {Object} webpackConfig webpack设置
 * @param {Module} HtmlWebpackPlugin 插件模块
 * @return {Object} 改变之后的webpackConfig
 */
//
const addHTMLPluginFromWebpackConfig = (webpackConfig, HtmlWebpackPlugin) => {
	get_webpack_html_files().forEach(el => {
		/** 形为：
			  new HtmlWebpackPlugin({
			title: 'index title',
			filename: 'foo-test.html'
		});
		  */
		webpackConfig.plugins.push(new HtmlWebpackPlugin(el));
	});
	return webpackConfig;
};

module.exports = {
	addHTMLPluginFromWebpackConfig
};
