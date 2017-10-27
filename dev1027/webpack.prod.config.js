const merge = require('webpack-merge');
const common = require('./webpack.common.config.js');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = merge(common, {
	plugins: [new UglifyJSPlugin()],
	output: {
		// publicPath: '/static/', //服务器上线的资源路径，需要添加前缀
	}
});
