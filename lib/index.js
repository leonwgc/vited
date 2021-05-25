"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _commander = require("commander");

var _process = _interopRequireDefault(require("process"));

var _dev = require("./dev");

var program = new _commander.Command();
program.command('start <dir>').description('打包src目录下的入口目录/文件').option('-p, --port [port]', '端口号', '9000').action(function (dir, options) {
  (0, _dev.run)(dir, '/', true, options.port);
});
program.command('build <dir>').description('构建src目录下的入口目录/文件').option('-p, --public-path [publicPath]', '设置publicPath, 默认 /', '/').action(function (dir, options) {
  (0, _dev.run)(dir, options.publicPath, false);
});
program.parse(_process["default"].argv);

if (!program.args[0]) {
  program.help();
}