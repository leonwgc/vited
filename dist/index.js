'use strict';

var _require = require('commander'),
    Command = _require.Command;

var start = require('./dev');

var program = new Command();

var pkg = require('../package.json');

program.option('-e, --entry <dir>', 'src目录下的入口目录/文件').option('-b, --build', '打包编译到dist').option('-p, --public-path <path>', '设置publicPath, 默认 /', '/').helpOption('-h, --help', '帮助信息').version(pkg.version, '-v, --version', '版本信息');
program.parse(process.argv);
var args = program.opts();
var entry = args.entry,
    build = args.build,
    publicPath = args.publicPath;

if (entry) {
  start(entry, build, publicPath);
} else {
  program.help();
}
