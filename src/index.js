const { Command } = require('commander');
const start = require('./dev');
const program = new Command();
const pkg = require('../package.json');

program
  .option('-e, --entry <dir>', 'src目录下的入口目录/文件')
  .option('-b, --build', '打包编译到dist')
  .option('-p, --public-path <path>', '设置publicPath, 默认 /', '/')
  .helpOption('-h, --help', '帮助信息')
  .version(pkg.version, '-v, --version', '版本信息');

program.parse(process.argv);

const args = program.opts();

const { entry, build, publicPath } = args;

if (entry) {
  start(entry, build, publicPath);
} else {
  program.help();
}
