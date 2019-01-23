#!/usr/bin/env node

import meow from 'meow';
import updateNotifier from 'update-notifier';
import chalk from 'chalk';
import isEmpty from 'lodash/isEmpty';
import redent from 'redent';

import fastGitignore from './fastGitignore';

(async () => {
  try {
    const cli = meow(`
      使用方式
        $ fast-gitignore <主题> <...> 选项 [...]
        $ fg <主题> <...> 选项 [...]

      选项
        --out, -o, '.gitignore' 文件存储位置，默认：'process.cwd()'

      示例
        $ fg macOS Windows Linux Node -o .
    `, {
      flags: {
        out: {
          type: 'string',
          alias: 'o',
        },
        help: {
          type: 'boolean',
          alias: 'h',
        },
      },
    });

    updateNotifier({ pkg: cli.pkg }).notify();

    const { input, flags } = cli;
    const { out } = flags;

    if (input.length === 0) {
      throw Error('需被 Git 忽略的内容主题');
    }

    let $out = out;
    if (isEmpty(out)) {
      $out = process.cwd();
    }

    const rslt = await fastGitignore(input, $out);
    const hint = `
      ${chalk.green.bold(rslt.message)}
      ${chalk.grey(rslt.out)}
    `;

    console.log(redent(hint, 2));
  } catch (error) {
    throw error;
  }
})();
