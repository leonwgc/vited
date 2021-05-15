'use strict';

/* eslint-disable no-console */
var ejs = require('ejs');

var process = require('process');

var fs = require('fs');

var path = require('path');

var chalk = require('chalk');

var execa = require('execa');

var glob = require('glob');

module.exports = function (cfg) {
  var build = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var s = glob.sync("./src/**/".concat(cfg, "/index{.jsx,.js,.ts,.tsx}"));

  if (!s.length) {
    exit("not exist: ./src/".concat(cfg, "/index.{jsx,js,tsx,ts}"));
  }

  var entry = s[0] || './src/index';
  var distFile = "index.html";
  var srcEjs;

  if (fs.existsSync(getProjectPath('./index.ejs'))) {
    srcEjs = getProjectPath('./index.ejs');
  } else {
    srcEjs = getToolPath('../index.ejs');
  }

  if (typeof cfg !== 'string') {
    exit('please set cfg');
  }

  var viteConfigTpl = getToolPath('../vite.config.ejs');
  var destConfig = getProjectPath('./vite.config.js');
  ejs.renderFile(viteConfigTpl, {
    cfg: cfg
  }, function (err, body) {
    if (err) throw err;

    if (fs.existsSync(destConfig)) {
      fs.unlinkSync(destConfig);
    }

    fs.writeFileSync(destConfig, body);
    ejs.renderFile(srcEjs, {
      entry: entry
    }, function (err, body) {
      if (err) {
        throw err;
      } else {
        if (fs.existsSync(distFile)) {
          fs.unlinkSync(distFile);
        }

        fs.writeFileSync(distFile, body);
        console.log(chalk.green("".concat(build ? '打包' : '开发', ":").concat(cfg)));

        var _execa = execa('vite', ["".concat(build ? 'build' : 'serve')]),
            stdout = _execa.stdout,
            stderr = _execa.stderr;

        stdout.on('data', function (data) {
          console.log(chalk.green(Buffer.from(data, 'utf-8')));
        });
        stderr.on('data', function (data) {
          console.log(chalk.red(Buffer.from(data, 'utf-8')));
        });
      }
    });
  });

  function exit(error) {
    console.log(chalk.red(error));
    process.exit(9);
  }

  function getProjectPath() {
    var dir = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : './';
    return path.join(process.cwd(), dir);
  }

  function getToolPath() {
    var dir = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : './';
    return path.join(__dirname, dir);
  }
};
