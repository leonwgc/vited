/* eslint-disable */
import path from 'path';
import fs from 'fs';
import process from 'process';
import chalk from 'chalk';
import glob from 'glob';
import { createServer, UserConfig, build } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import styleImport from 'vite-plugin-style-import';
import getTpl from './tpl';

//#region  helper
const getProjectPath = (dir = './') => {
  return path.join(process.cwd(), dir);
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
) => {
  let s = glob.sync(`./src/${dir}/index{.jsx,.js,.ts,.tsx}`);

  if (!s.length) {
    s = glob.sync(`./src/index{.jsx,.js,.ts,.tsx}`);
    if (!s.length) {
      exit(`can't find entry file`);
    }
  }
  if (!fs.existsSync(getProjectPath('./index.html'))) {
    fs.writeFileSync(getProjectPath('./index.html'), getTpl(s[0]));
  }

  const modifyVars = {
    '@primary-color': '#004bcc',
    '@link-color': '#004bcc',
  };

  /**
   * @type {import('vite').UserConfig}
   */
  const config: UserConfig = {
    css: {
      preprocessorOptions: {
        less: {
          relativeUrls: false,
          javascriptEnabled: true,
          modifyVars,
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
        '~': path.resolve(__dirname, './src'),
        '@': path.resolve(__dirname, './src'),
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
      outDir: `dist`,
      assetsDir: 'assets',
      emptyOutDir: true,
      assetsInlineLimit: 10240,
      rollupOptions: {
        input: {
          index: getProjectPath('./index.html'),
        },
      },
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
        envFile: false,
        mode: 'development',
        ...config,
      });
    })();
  }
};
