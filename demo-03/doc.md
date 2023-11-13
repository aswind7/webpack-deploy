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
### 介绍
**babel**         
>  本配置实现了对babel的完全使用     

使用 babel-loader、babel-core、[babel-plugin-transform-runtime](http://babeljs.io/docs/plugins/transform-runtime/#)、[babel-preset-env](http://babeljs.io/)对js进行编译和优化。

* [babel-preset-env](http://babeljs.io/) 涵盖了多个preset, 用于编译新的句法如 class,箭头函数，For-of等，有了它就不需要再写preset2015,2016了； 
* [babel-plugin-transform-runtime](http://babeljs.io/docs/plugins/transform-runtime#polyfill)会提取编译时候产生的公共方法，防止重复代码，并且它会自己实现一个promise、Set、Map等的polyfill，无须额外引入了。
* 即便如此，也不能全部编译为es5,比如`"foobar".includes("foo")` 这样的内置方法，需要额外使用[babel-polyfill](http://babeljs.io/docs/usage/polyfill)。用法：[http://babeljs.io/](http://babeljs.io/),它配合[babel-preset-env](http://babeljs.io/)的 `useBuiltIns`参数，可以使polyfill使用的代码更少。 

**postcss**         
>  本配置实现了对postcss的完全使用  

**less**         
>  可以编写less文件，然后在主入口require一下，就会打包到js中；  
 
### FAQ 
*	暂未实现css提取为外部文件；
*	暂未实现img转化为base64；
*  暂未实现Hhtml递归自动打包多个，需手动重复；