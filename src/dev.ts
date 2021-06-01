/* eslint-disable */
import path from 'path';
import fs from 'fs';
import process from 'process';
import chalk from 'chalk';
import glob from 'glob';
import { createServer, UserConfig, build, normalizePath } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import styleImport from 'vite-plugin-style-import';
import getTpl from './tpl';
import cheerio from 'cheerio';

//#region  helper
const getProjectPath = (dir = './') => {
  return normalizePath(path.join(process.cwd(), dir));
};

function exit(error) {
  console.log(chalk.red(error));
  process.exit(9);
}

//#endregion

export const run = (
  dir = 'index',
  publicPath = '/',
  isDev = true,
  port = 9000,
  theme = '',
) => {
  let s = glob.sync(`./src/${dir}/index{.jsx,.js,.ts,.tsx}`);

  if (!s.length) {
    s = glob.sync(`./src/index{.jsx,.js,.ts,.tsx}`);
    if (!s.length) {
      exit(`No entry file found : ${getProjectPath('./src/index')}`);
    }
  }

  const entry = s[0];
  const indexHtml = getProjectPath('./index.html');
  if (!fs.existsSync(indexHtml)) {
    fs.writeFileSync(indexHtml, getTpl(entry));
  } else {
    const content = fs.readFileSync(indexHtml, { encoding: 'utf-8' });
    let $ = cheerio.load(content);
    $('script[type="module"]').attr('src', entry);
    fs.writeFileSync(indexHtml, $.html());
  }

  let lessOptions = {};

  if (theme) {
    lessOptions = {
      modifyVars: { '@primary-color': theme, '@link-color': theme },
    };
  }

  /**
   * @type {import('vite').UserConfig}
   */
  const config: UserConfig = {
    css: {
      preprocessorOptions: {
        less: {
          relativeUrls: false,
          javascriptEnabled: true,
          ...lessOptions,
        },
        scss: {
          implementation: require('sass'),
        },
      },
    },
    define: {
      __dev__: !!isDev,
    },
    plugins: [
      styleImport({
        libs: [
          {
            libraryName: 'antd',
            esModule: true,
            resolveStyle: (name) => {
              return `antd/es/${name}/style/index`;
            },
          },
          {
            libraryName: 'zarm',
            esModule: true,
            resolveStyle: (name) => {
              return `zarm/es/${name}/style/css`;
            },
          },
        ],
      }),
    ],
    resolve: {
      alias: {
        '~': getProjectPath('./src'),
        '@': getProjectPath('./src'),
      },
    },
    logLevel: 'info',
  };

  if (isDev) {
    config.plugins.unshift(reactRefresh());
    config.server = {
      port,
      host: '0.0.0.0',
    };
  } else {
    config.base = publicPath;
    config.build = {
      emptyOutDir: true,
      assetsInlineLimit: 10240,
    };
  }

  if (isDev) {
    (async () => {
      const server = await createServer({
        configFile: false,
        root: process.cwd(),
        envFile: false,
        base: '/',
        ...config,
      });
      await server.listen(port);
    })();
  } else {
    (async () => {
      await build({
        configFile: false,
        root: process.cwd(),
        base: publicPath,
        envFile: false,
        ...config,
      });
    })();
  }
};
