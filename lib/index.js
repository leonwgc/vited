"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _commander = require("commander");

var _process = _interopRequireDefault(require("process"));

var _dev = require("./dev");

var _package = _interopRequireDefault(require("../package.json"));

var program = new _commander.Command();
program.name('vited').usage('[options] start/build');
program.version(_package["default"].version, '-v, --version');
program.command('start [dir]').description('启动开发').option('-p, --port [port]', '端口号', '9000').action(function () {
  var dir = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'index';
  var options = arguments.length > 1 ? arguments[1] : undefined;
  (0, _dev.run)(dir, '/', true, options.port);
});
program.command('build [dir]').description('启动构建').option('-p, --public-path [publicPath]', '设置publicPath, 默认 /', '/').action(function () {
  var dir = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'index';
  var options = arguments.length > 1 ? arguments[1] : undefined;
  (0, _dev.run)(dir, options.publicPath, false);
});
program.parse(_process["default"].argv);

if (_process["default"].argv.length < 3) {
  program.outputHelp();
}