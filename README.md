基于 vite2.0 构建工具

### 特点

- 无需编写 vite.config
- 默认支持 react
- 支持 typescript
- 默认支持按需加载 zarm 和 antd v4 style

## 安装

用[npm](https://npmjs.org/) / [yarn](https://yarnpkg.com) 安装:

    $ npm install --save-dev vited
    $ yarn add -D vited

#### 开发

vited start [-p port]

##### 打包

vited build [-p publicPath]

##### 自定义配置

使用默认导出的 node api

```js
export declare const run: (isDev: any, options: UserConfig) => void;
```

### demo

参考 [https://github.com/leonwgc/vited-demo](https://github.com/leonwgc/vited-demo)
