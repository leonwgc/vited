/* eslint-disable no-console */
const ejs = require('ejs');
const process = require('process');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const execa = require('execa');
const glob = require('glob');

module.exports = (entry, build = false, publicPath = '/') => {
  let s = glob.sync(`./src/${entry}/index{.jsx,.js,.ts,.tsx}`);
  if (!s.length) {
    s = glob.sync(`./src/${entry}{.jsx,.js,.ts,.tsx}`);
    if (!s.length) {
      exit(`can't find entry file`);
    }
  }
  const entryFile = s[0];
  let distFile = `${build ? entry : 'index'}.html`;

  let srcEjs;

  if (fs.existsSync(getProjectPath('./index.ejs'))) {
    srcEjs = getProjectPath('./index.ejs');
  } else {
    srcEjs = getToolPath('../index.ejs');
  }

  const viteConfigTpl = getToolPath('../vite.config.ejs');
  const destConfig = getProjectPath('./vite.config.js');

  const cleanup = () => {
    try {
      if (fs.existsSync(destConfig)) {
        fs.unlinkSync(destConfig);
      }
      if (fs.existsSync(distFile)) {
        fs.unlinkSync(distFile);
      }
    } finally {
    }
  };

  cleanup();

  ejs.renderFile(viteConfigTpl, { entry, publicPath }, (err, body) => {
    if (err) throw err;
    if (fs.existsSync(destConfig)) {
      fs.unlinkSync(destConfig);
    }
    fs.writeFileSync(destConfig, body);
    ejs.renderFile(
      srcEjs,
      {
        entry: entryFile,
      },
      (err, body) => {
        if (err) {
          throw err;
        } else {
          if (fs.existsSync(distFile)) {
            fs.unlinkSync(distFile);
          }
          fs.writeFileSync(distFile, body);

          console.log(chalk.green(`${build ? '打包' : '开发'}:${entry}`));

          const sp = execa('vite', [`${build ? 'build' : 'serve'}`]);

          const { stdout, stderr } = sp;

          stdout.on('data', (data) => {
            console.log(chalk.green(Buffer.from(data, 'utf-8')));
          });

          stderr.on('data', (data) => {
            console.log(chalk.red(Buffer.from(data, 'utf-8')));
          });

          sp.on('exit', () => {
            cleanup();
            console.log(chalk.green('done 🍺'));
          });
        }
      },
    );
  });

  function exit(error) {
    console.log(chalk.red(error));
    process.exit(9);
  }

  function getProjectPath(dir = './') {
    return path.join(process.cwd(), dir);
  }

  function getToolPath(dir = './') {
    return path.join(__dirname, dir);
  }
};
