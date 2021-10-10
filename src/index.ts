import { Command } from 'commander';
import process from 'process';
import { run } from './vited';

const program = new Command();

program.name('vited').usage('[options] start/build');
program.version(require('../package').version, '-v, --version');

program
  .command('start')
  .description('开发')
  .option('-p, --port [port]', '端口号', '3000')
  .action((options) => {
    run(true, {
      base: '/',
      server: {
        port: Number(options.port),
      },
    });
  });

program
  .command('build')
  .description('构建')
  .option('-p, --public-path [publicPath]', '设置publicPath, 默认 /', '/')
  .action((options) => {
    run(false, {
      base: options.publicPath,
    });
  });

program.parse(process.argv);

if (process.argv.length < 3) {
  program.outputHelp();
}
