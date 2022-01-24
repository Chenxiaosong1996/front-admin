'use strict';

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

const packagePath = path.resolve(__dirname, '../package.json');
const indexPath = path.resolve(__dirname, '../dist/front-admin/index.html');
const packageData = JSON.parse(fs.readFileSync(packagePath));

// 获取原index.html文件内容
let indexContent = fs.readFileSync(indexPath, 'utf-8');
indexContent = indexContent
  .replace(
    '<meta charset="utf-8">',
    `<meta charset="utf-8">\n    <meta name="version" content="V${
      packageData.version
    }">\n    <meta name="name" content="${packageData.name}">\n    <meta name="author" content="${
      packageData.author.name
    } || ${packageData.author.email}">\n    <meta name="keyword" content="${packageData.keywords.join(
      ',',
    )}">\n    <meta name="description" content="${packageData.description}">`,
  )
  .replace(
    '</body>',
    `\n  <script type="text/javascript">!function(){var u=function(e){var a=["%c ".concat(e.title," %c ").concat(e.content," "),"padding: 1px; border-radius: 3px 0 0 3px; color: #fff; background: #000;","padding: 1px; border-radius: 0 3px 3px 0; color: #fff; background: #7546c9;"];return function(){var e;window.console&&"function"===typeof window.console.log&&(e=console).log.apply(e,arguments)}.apply(void 0,a),a};u({title:"Environment",content:"production"});u({title:"Version",content:"${
      packageData.version
    }"});u({title:"Build Date",content:"${new Date().toJSON()}"})}()</script>\n</body>`,
  );
// 写入模式打开index.html
const fd = fs.openSync(indexPath, 'w');
// 内容写入
fs.writeFile(fd, indexContent, 'utf8', function (writeErr) {
  if (!writeErr) {
    console.log(chalk.blue(`index.html 文件 Publish 成功！`));
    fs.closeSync(fd);
  } else {
    console.log(chalk.red(writeErr));
  }
});
