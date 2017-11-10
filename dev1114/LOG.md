* 解决了chunkhash 在dev模式下报错的问题。错误信息如下：

```
ERROR in chunk manifest [entry]
js/[name].[chunkhash].js
Cannot use [chunkhash] for chunk in 'js/[name].[chunkhash].js' (use [hash] instead)
```
解决办法： dev模式不打包（vue-cli在dev模式css和js都不打包，不提取），生产环境才打包。
