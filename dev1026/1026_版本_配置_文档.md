#webpack配置说明

### 运行
开发环境： `npm run dev` 会自动打开浏览器8080端口，有热更新功能；   
生产环境： `npm run build` 会自动打包，产出的所有资源均在dist目录下。  

**资源引用：**   
如果在生产环境打包时，需要更换静态资源路径（比如放cdn），则需要在webpack.prod.config.js文件中加上:

```
	output: {
		publicPath: '/static/', //服务器上线的资源路径添加的前缀
	}
```


###约定
1.源代码和资源文件都放在src目录中，如下所示：

```
src
|____css
| |____style.css
|____js
| |____rem.js
| |____main.js
| |____total.js
|____template
| |____index.html
| |____test.html
|____img
| |____slice
| | |____bg001.png
```
html文件中无须引用js和css,webpack会打包好，*图片的引用怎么办？* => 用了html-loader提取出来

2.如果有多个html文件，则需要在webpack.common.config.js中把以下代码重复多次。

```
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: 'src/template/index.html'
		})
```

###FAQ 
*	暂未实现css提取；
*	暂未实现img转化为base64；
*  暂未实现ES6编译；
*  暂未实现Hhtml递归自动打包多个，需手动重复；