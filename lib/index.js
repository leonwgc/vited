"use strict";

var _commander = require("commander");

var _process = _interopRequireDefault(require("process"));

var _vited = require("./vited");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var program = new _commander.Command();
program.name('vited').usage('[options] start/build');
program.version(require('../package').version, '-v, --version');
program.command('start').description('开发').option('-p, --port [port]', '端口号', '3000').action(function (options) {
  (0, _vited.run)(true, {
    base: '/',
    server: {
      port: options.port
    }
  });
});
program.command('build').description('构建').option('-p, --public-path [publicPath]', '设置publicPath, 默认 /', '/').action(function (options) {
  (0, _vited.run)(false, {
    base: options.publicPath
  });
});
program.parse(_process.default.argv);

if (_process.default.argv.length < 3) {
  program.outputHelp();
}