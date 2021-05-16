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


```js
  -e, --entry <dir>  src目录下的入口目录/文件(不带扩展名)
  -b, --build         打包编译到dist目录
  -p --public-path    设置publicPath, 默认 /
```

#### 安装vite依赖

```js
  "devDependencies": {
    "@vitejs/plugin-react-refresh": "^1.3.2",
    "vite": "^2.3.0",
    "vite-plugin-style-import": "^0.10.0"
  },
```


##### 开发

```js
vited -e dir/file
```

#### 设置开发端口
给package.json添加port属性 , 默认端口9004


```js
{
  "name": "name",
  "version": "1.0.0",
  "scripts": {},
  "port":3000
}

```

##### 打包

```js
vited -be dir/file

// 设置publicPath
vited -be dir/file -p https://www.xxx.com/
```

项目根目录自定义 html 模板 index.ejs (可选),下列是默认模板 ,<%=entry%> 是入口路径

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
    <script type="module" src="<%=entry%>"></script>
  </body>
</html>


```
