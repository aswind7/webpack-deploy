module.exports = {
	plugins: {
		autoprefixer: {
			browsers: ['> 1%', 'last 2 versions', 'ie >= 9']
		},
		cssnano: {
			zindex: false,
			reduceIdents: false,
			discardComments: {
				removeAll: false
			}
		}
	}
};
