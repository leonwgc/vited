'use strict';

var _require = require('commander'),
    Command = _require.Command;

var start = require('./dev');

var program = new Command(); // config dir name under src  or entry filename(no ext) under src

program.version('0.0.1');
program.option('-c, --config <dir>', '包含入口文件index.jsx/tsx的目录名').option('-b, --build', '打包编译到dist').option('-p, --public-path <path>', 'publicPath设置', '/');
program.parse(process.argv);
var args = program.opts();

if (typeof args.config === 'string') {
  var config = args.config,
      build = args.build,
      publicPath = args.publicPath;
  start(config, build, publicPath);
} else {
  program.help();
}
