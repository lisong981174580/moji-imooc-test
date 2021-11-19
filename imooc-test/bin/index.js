#!/usr/bin/env node

const lib = require('moji-imooc-test-lib');

// console.log(lib.sum(1, 2));
// console.log('welcome imooc-test');

// 注册一个命令 imooc-test init
const argv = require('process').argv;

// console.log('argv', argv);

const command = argv[2];

console.log('command', command);

const options = argv.slice(3);

// console.log('options', options);

if (options.length > 1) {
  let [option, param] = options;

  option = option.replace('--', '');
  
  console.log('option', option);
  console.log('param', param);
  
  if (command) {
    if (lib[command]) {
      lib[command]({ option, param });
    } else {
      console.log('无效的命令')
    }  
  } else {
    console.log('请输入命令')
  }
}

// 实现参数解析 --version 和 init --nanme
if (command) {
  if (command.startsWith('--') || command.startsWith('-')) {
    const gloabalOption = command.replace(/--|-/g, '');

    console.log('gloabalOption', gloabalOption);

    if (gloabalOption === 'version' || gloabalOption === 'V') {
      console.log('1.0.0');
    }
  }
} else {
  console.log('请输入命令')
}