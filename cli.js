#!/usr/bin/env node
'use strict';

const fs = require('fs-extra');
const chalk = require('chalk');
const path = require('path');
const os = require('os');
const { spawnSync } = require('child_process');

// get base template path
const TEMPLATE_PATH = path.join(__dirname, 'templates');
// get first argv as name
const APP_NAME = process.argv[2] || 'tjn-app';
// get current working dir
const CURRENT_PATH = process.cwd();
// set App Path
const APP_PATH = path.join(CURRENT_PATH, APP_NAME);
// try to make app dir if not exists
const isAppDirExists = fs.existsSync(APP_PATH);
if (!isAppDirExists) {
  fs.mkdirSync(APP_PATH);
}
// copy over the templates dir
fs.copySync(TEMPLATE_PATH, APP_PATH);
// update package.json
const packageJson = require(path.join(APP_PATH, 'pkg.json'));
packageJson.name = APP_NAME;
packageJson.scripts = {
  'bundle': `webpack -p --progress --config ./config/webpack.prod.js --appName=${APP_NAME}`,
  'start': `webpack-dev-server --config ./config/webpack.dev.js --appName=${APP_NAME}`,
  'analysis': `cross-env NODE_ENV=analysis webpack -p --progress --config ./config/webpack.prod.js --appName=${APP_NAME}`,
  'test': 'jest'
};
fs.writeFileSync(
  path.join(APP_PATH, 'pkg.json'),
  JSON.stringify(packageJson, null, 2) + os.EOL
);
fs.renameSync(
  path.join(APP_PATH, 'pkg.json'),
  path.join(APP_PATH, 'package.json')
);
// rename rc files
fs.renameSync(
  path.join(APP_PATH, 'gitignore'),
  path.join(APP_PATH, '.gitignore')
);
fs.renameSync(
  path.join(APP_PATH, 'eslintrc.js'),
  path.join(APP_PATH, '.eslintrc.js')
);
fs.renameSync(
  path.join(APP_PATH, 'eslintignore'),
  path.join(APP_PATH, '.eslintignore')
);
// perform npm install
console.log(chalk.cyan('📦 Installing Packages...'));
const proc = spawnSync(
  'npm', 
  ['install'],
  {
    cwd: APP_PATH,
    stdio: 'inherit'
  }
);
if (proc.status !== 0) {
  console.error('npm install failed');
  process.exit(1);
}

console.log();
console.log(chalk.cyan('Setup Complete, Good Luck and Happy Hacking! ✌'));
process.exit(0);