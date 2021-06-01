import { Command, option } from 'commander';
import process from 'process';
import { run } from './dev';
import pkg from '../package.json';

const program = new Command();

program.name('vited').usage('[options] start/build');
program.version(pkg.version as string, '-v, --version');

program
  .command('start [dir]')
  .description('启动开发')
  .option('-p, --port [port]', '端口号', '9000')
  .option('-t, --theme [theme]', '主题色')
  .action((dir = 'index', options) => {
    run(dir, '/', true, options.port, options.theme);
  });

program
  .command('build [dir]')
  .description('启动构建')
  .option('-p, --public-path [publicPath]', '设置publicPath, 默认 /', '/')
  .option('-t, --theme [theme]', '主题色')
  .action((dir = 'index', options) => {
    run(dir, options.publicPath, false, 9000, options.theme);
  });

program.parse(process.argv);

if (process.argv.length < 3) {
  program.outputHelp();
}
