'use strict';

var _require = require('commander'),
    Command = _require.Command;

var start = require('./dev');

var program = new Command();
program.command('start <dir>').description('打包src目录下的入口目录/文件').action(function (dir) {
  start(dir, false, '/');
});
program.command('build <dir>').description('构建src目录下的入口目录/文件').option('-p, --public-path [publicPath]', '设置publicPath, 默认 /', '/').action(function (dir, options) {
  start(dir, true, options.publicPath);
});
program.parse(process.argv);

if (!program.args[0]) {
  program.help();
}
