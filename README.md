### vited 

基于vite2.0开发/打包工具

### 特点
- 无需编写vite.config
- 默认支持react和 react hmr
- 支持 typescript
- 支持spa/mpa 构建

## 安装

用[npm](https://npmjs.org/) / [yarn](https://yarnpkg.com) 安装:

    $ npm install --save-dev vited
    $ yarn add -D vited


#### 开发
```js
 
 目录结构
 --src
    -index.jsx/tsx/ts/js
```

vited start [-p port]

```js
目录结构
 --src
    --dir
      -index.jsx/tsx/ts/js
```
vited start dir [-p port]

##### 打包

```js
vited build  -p https://www.xxx.com/ , 不设置publicPath, 则默认为 /
```

vited build [-p publicPath]
 
#### vited包含安装的vite依赖

```js
  "devDependencies": {
    "@vitejs/plugin-react-refresh": "^1.3.2",
    "vite": "^2.3.0",
    "vite-plugin-style-import": "^0.10.0"
  },
```

##### 默认 html 入口

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
    <script type="module" src="./src/index.jsx"></script>
  </body>
</html>

```

### demo 
参考 [https://github.com/leonwgc/vited-demo](https://github.com/leonwgc/vited-demo)