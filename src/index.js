const { Command } = require('commander');
const start = require('./dev');
const program = new Command();

// config dir name under src  or entry filename(no ext) under src

program.version('0.0.1');
program
  .option('-c, --config <dir>', '包含入口文件index.jsx/tsx的目录名')
  .option('-b, --build', '打包编译到dist');

program.parse(process.argv);

const options = program.opts();

if (typeof options.config === 'string') {
  const { config, build } = options;
  start(config, build);
} else {
  program.help();
}
