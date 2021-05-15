### vited用法
 
```js
  -c, --config <dir>  包含入口文件index.jsx/tsx的目录名
  -b, --build         打包编译到dist
```

##### 开发

```js
vited -c src
```
##### 打包
```js
vited -bc src
```


项目根目录自定义 html 模板 index.ejs (可选),下列是默认模板

```js
<!DOCTYPE html>
<html lang="zh-cn">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta
      name="viewport"
      content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no,minimal-ui,viewport-fit=cover"
    />
    <meta name="format-detection" content="telephone=no, email=no" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-touch-fullscreen" content="yes" />
    <title></title>
  </head>
  <body style="font-size: 14px">
    <div id="root"></div>
    <script type="module" src="./src/<%=cfg%>/index"></script>
  </body>
</html>

```