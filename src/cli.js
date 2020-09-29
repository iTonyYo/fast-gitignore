import meow from 'meow';
import updateNotifier from 'update-notifier';
import chalk from 'chalk';
import redent from 'redent';
import { cosmiconfigSync } from 'cosmiconfig';

import pkg from '../package.json';
import isEmpty from './utilities/isEmpty';
import get from './utilities/get';
import getWorkingDirectory from './getWorkingDirectory';
import fastGitignore from './fastGitignore';

class Cli {
  constructor() {
    updateNotifier({ pkg }).notify();

    this.cli = meow(
      `
        使用方式
          $ fast-gitignore [主题] [...] [选项] [...]

        选项
          --out, -o,                                       '.gitignore' 文件存储位置，默认：'process.cwd()'
          --version, -V,                                   查看版本号
          --help, -h                                       查看帮助

        示例
          $ fast-gitignore macOS Windows Linux Node -o .   在命令行中指定需要忽略的文件
          $ fast-gitignore -o .                            已在配置中指定需要忽略的文件
      `,
      {
        flags: {
          out: {
            type: 'string',
            alias: 'o',
          },
          help: {
            type: 'boolean',
            alias: 'h',
          },
          version: {
            type: 'boolean',
            alias: 'V',
          },
        },
      },
    );

    this.workingPath = getWorkingDirectory(this.cli.input[0]).twd;
    this.userDefinedConfig = this.getUserDefinedConfig();
  }

  async run() {
    const rslt = await fastGitignore(
      this.getSelectedTemplatesByName(),
      this.getDest(),
    );

    console.log(
      redent(
        chalk`
          {green.bold ${rslt.message}}
          {grey ${rslt.out}}
        `,
        2,
      ),
    );
  }

  // 待办： 是否提示 "必须提供需要被 Git 忽略的内容主题"
  getSelectedTemplatesByName() {
    const { input } = this.cli;

    if (isEmpty(input)) {
      return this.userDefinedConfig;
    }

    return input;
  }

  getDest() {
    const { flags } = this.cli;
    const { out } = flags;

    if (isEmpty(out)) {
      return this.workingPath;
    }

    return out;
  }

  getUserDefinedConfig() {
    const explorer = cosmiconfigSync('gitignore');
    const foundConfig = explorer.search(this.workingPath);

    return isEmpty(foundConfig) ? {} : get(foundConfig, 'config');
  }
}

export default Cli;
