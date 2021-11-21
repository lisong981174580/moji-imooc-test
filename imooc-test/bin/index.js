#!/usr/bin/env node

// const lib = require('moji-imooc-test-lib');

// // console.log(lib.sum(1, 2));
// // console.log('welcome imooc-test');

// // 注册一个命令 imooc-test init
// const argv = require('process').argv;

// // console.log('argv', argv);

// const command = argv[2];

// console.log('command', command);

// const options = argv.slice(3);

// // console.log('options', options);

// if (options.length > 1) {
//   let [option, param] = options;

//   option = option.replace('--', '');
  
//   console.log('option', option);
//   console.log('param', param);
  
//   if (command) {
//     if (lib[command]) {
//       lib[command]({ option, param });
//     } else {
//       console.log('无效的命令')
//     }  
//   } else {
//     console.log('请输入命令')
//   }
// }

// // 实现参数解析 --version 和 init --nanme
// if (command) {
//   if (command.startsWith('--') || command.startsWith('-')) {
//     const gloabalOption = command.replace(/--|-/g, '');

//     console.log('gloabalOption', gloabalOption);

//     if (gloabalOption === 'version' || gloabalOption === 'V') {
//       console.log('1.0.0');
//     }
//   }
// } else {
//   console.log('请输入命令')
// }

// console.log('process.argv', process.argv);

const yargs = require('yargs/yargs');
const cli = yargs();

cli
  .usage('Usage: $0 [command] <optios>')
  .demandCommand(1, '最少传入一个命令, 可以通过 --help 查看所有可用的命令和选项')
  .strict()
  .recommendCommands()
  .fail((err, msg) => {
    console.log('err', err);
  })
  .alias('h', 'help')
  .alias('v', 'version')
  .alias('v', 'version')
  .wrap(cli.terminalWidth())
  .epilogue(require('dedent')`  
     When a commond fails, all logds are written to lerna-debug.log in the current working directory.

     For more informatoion, find our manual at https:github.com/lerna/lerna
  `)
  .options({ // 对象写法
    debug: {
      type: 'boolean',
      describe: '调试 debug',
      alias: 'd',
    }
  })
  .option('registry', { // 非对象写法
    type: 'string',
    describe: '定义全局 registry',
    alias: 'r',
    // hidden: true, // 隐藏命令
  })
  .group(['debug'], 'Dev optios:') // 分组
  .group(['registry'], 'Extra Optios:')
  .command('init [name]', 'Do init a project', (yargs) => {
    yargs
     .options('name', {
       type: 'string',
       alias: 'n',
       describe: '项目的名称',
     })
  }, (argv) => {
    console.log(argv)
  })
  .command({ // 对象写法
    command: 'list',
    aliases: ['ls', 'la', 'll'],
    describe: 'list local packags',
    builder: (yargs) => {

    },
    handler: (argv) => {
      console.log(argv);
    },
  })
  // argv context
  .parse(process.argv.slice(2), {
    mojiImoocTestVersion: require('../package.json').version,
    // pkg: require('../package.json'),
  });
  