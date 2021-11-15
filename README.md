vite2 cli 打包构建

### 特点

- 无需配置 vite.config 文件
- react 开发开箱即用
- 默认支持 react & hmr & typescript, jsx,tsx 可混写
- 支持自定义配置（通过 node api）

## 安装

用[npm](https://npmjs.org/) / [yarn](https://yarnpkg.com) 安装:

    $ npm install --save-dev vited
    $ yarn add -D vited

#### 开发

vited start [-p port]

##### 打包

vited build [-p publicPath]

##### 自定义配置

使用导出的 node api 自定义开发构建

```js
/**
 * 自定义开发/编译配置
 *
 * @param {boolean} isDev 是否开发环境
 * @param {UserConfig} options vite配置
 * @param {() => void} [callback] 编译结束后的回调
 */
export declare const run: (isDev: boolean, options: UserConfig, callback?: () => void) => void;
```

```js
const { run } = require('vited');

run(
  false,
  {
    server: {
      port: 3001,
    },
  },
  () => {
    console.log('构建完成');
  }
);
```

### 注意

less,sass 没有默认安装，要使用，请在项目文件自行安装 devDependencies
e.g.

```js
  "devDependencies": {
    "less": "^4.1.2",
    "sass": "^1.42.1",
  }
```

### demo

参考 [https://github.com/leonwgc/vited-demo](https://github.com/leonwgc/vited-demo)
