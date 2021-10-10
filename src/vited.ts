/* eslint-disable */
import path from 'path';
import fs from 'fs';
import process from 'process';
import chalk from 'chalk';
import glob from 'glob';
import { createServer, UserConfig, InlineConfig, build as runBuild, normalizePath } from 'vite';
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

const defaultConfig: InlineConfig = {
  configFile: false,
  envFile: false,
  root: process.cwd(),
  base: '/', // publicPath
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
};

/** run vite with config */
export const run = (isDev, options: UserConfig) => {
  const entries = glob.sync(`./src/index{.jsx,.js,.ts,.tsx}`);
  if (!entries.length) {
    exit(`No entry file found : ${getProjectPath('./src/index')}`);
  }

  const entry = entries[0];
  const indexHtml = getProjectPath('./index.html');
  if (!fs.existsSync(indexHtml)) {
    fs.writeFileSync(indexHtml, getTpl(entry));
    console.log(chalk.green('index.html not exist, created one'));
  } else {
    const content = fs.readFileSync(indexHtml, { encoding: 'utf-8' });
    let $ = cheerio.load(content);
    $('script[type="module"]').attr('src', entry);
    fs.writeFileSync(indexHtml, $.html());
  }

  const config: InlineConfig = {
    ...defaultConfig,
    configFile: false,
    envFile: false,
  };

  const { plugins = [], server = {}, build = {} } = options;

  config.plugins = config.plugins.concat(plugins);

  if (isDev) {
    config.plugins.unshift(reactRefresh());
    config.server = {
      port: 3000,
      host: '0.0.0.0',
      ...server,
    };
  } else {
    config.build = {
      emptyOutDir: true,
      assetsInlineLimit: 10240,
      ...build,
    };
  }

  if (isDev) {
    const port = config.server.port || 3000;
    (async () => {
      const server = await createServer(config);
      await server.listen(port);
    })();
  } else {
    (async () => {
      await runBuild(config);
    })();
  }
};
