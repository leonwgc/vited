/* eslint-disable */
import path from 'path';
import fs from 'fs';
import process from 'process';
import chalk from 'chalk';
import glob from 'glob';
import { createServer, UserConfig, InlineConfig, build as runBuild, normalizePath } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import address from 'address';
import getTpl from './tpl';

//#region  helper
const getProjectPath = (dir = './') => {
  return normalizePath(path.join(process.cwd(), dir));
};

function exit(error) {
  console.log(chalk.red(error));
  process.exit(9);
}

//#endregion

const defaultConfig: InlineConfig = {
  configFile: false,
  envFile: false,
  base: '/', // publicPath
  resolve: {
    alias: {
      '~': getProjectPath('./src'),
      '@': getProjectPath('./src'),
    },
  },
};

/** run/**
 * 自定义开发/编译配置
 *
 * @param {boolean} isDev 是否开发环境
 * @param {UserConfig} options vite配置
 * @param {() => void} [callback] 编译结束后的回调
 */
export const run = (isDev: boolean, options: UserConfig, callback?: () => void) => {
  const entries = glob.sync(`./src/index{.jsx,.js,.ts,.tsx}`);
  if (!entries.length) {
    exit(`入口文件不存在: ${getProjectPath('./src/index')}`);
  }

  const entry = entries[0];
  const indexHtml = getProjectPath('./index.html');
  if (!fs.existsSync(indexHtml)) {
    fs.writeFileSync(indexHtml, getTpl(entry));
    console.log(chalk.green('index.html 已创建'));
  }

  const {
    plugins = [],
    server = {},
    build = {},
    css = {
      preprocessorOptions: {
        less: {
          relativeUrls: false,
          javascriptEnabled: true,
        },
      },
    },
  } = options;

  const config: InlineConfig = {
    ...defaultConfig,
    ...options,
    css,
  };

  config.plugins = [...plugins];

  if (isDev) {
    config.plugins.unshift(reactRefresh());
    config.server = {
      port: 3000,
      open: true,
      strictPort: true,
      ...server,
    };
    (async () => {
      const server = await createServer(config);
      await server.listen();
      const port = config.server.port;
      const serveUrl = `http://localhost:${port}`;
      const serverUrlIp = `http://${address.ip()}:${port}`;
      console.log();
      console.log(chalk.cyan('dev server running at:'));
      console.log();
      console.log('> Local:', chalk.green(`${serveUrl}`));
      console.log();
      console.log('> Network:', chalk.green(`${serverUrlIp}`));
    })();
  } else {
    config.build = {
      emptyOutDir: true,
      assetsInlineLimit: 10240,
      ...build,
    };

    (async () => {
      await runBuild(config).then(() => {
        callback?.();
      });
    })();
  }
};
