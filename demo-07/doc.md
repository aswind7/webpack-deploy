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
1.源代码和资源文件都放在src目录中：   
html文件中无须引用js和css,webpack会打包好，*图片的引用怎么办？* => **用了html-loader提取出来**
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
>  可以编写less文件，然后在主入口require一下，并且css会打包到一个css文件（已经实现多css提取）中。如何解决变量名冲突问题?

**html**
><del>暂未实现html递归自动打包多个，需手动重复；</del> 已经基于node实现递归，会自动获取template文件夹中的html文件。
 
**图片**
> <del>暂未实现img转化为base64；</del> 小的img转化为base64,并解决了css中图片路径出错的问题

**资源优化**
> 实现了vender.[chunkhash].js 的长效缓存，当更改业务中的js时，js文件名会被更改，以更新客户端浏览器中的js文件。而vender中是被打包的不变的库如vue,lodash等。此文件内容及名称不会改变，除非此vender数组添加或者删除了新的库文件（此数组中的文件都会被打包，不管是否在项目中import都会被打包）。[相关链接](https://doc.webpack-china.org/guides/caching/)   
> css用了contenthash, 即当css内容变动时候，文件名自动更改；   
> img 用的[name].[hash], 替换相同name的img，hash会自动改变（我也不知道它内部是怎么实现的这个功能），无须手动改变name。   
> 实现了css分离，按文件夹归类来分离。
 
### FAQ 
*  <del>如何分离css为多个文件？暂时先打包为1个吧。（可以尝试在不同的js中异步require然后设置chunkName或者 多个ExtractTextPlugin 或者递归） [相关链接1](https://github.com/jquintozamora/webpack-multiple-css-output/blob/master/webpack/webpack.config.js)***   [相关链接2](https://github.com/webpack/webpack/tree/master/examples/multiple-entry-points-commons-chunk-css-bundle)**</del>