#!/usr/bin/env node
"use strict";

var _meow = _interopRequireDefault(require("meow"));

var _updateNotifier = _interopRequireDefault(require("update-notifier"));

var _chalk = _interopRequireDefault(require("chalk"));

var _isEmpty = _interopRequireDefault(require("lodash/isEmpty"));

var _redent = _interopRequireDefault(require("redent"));

var _fastGitignore = _interopRequireDefault(require("./fastGitignore"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(async () => {
  try {
    const cli = (0, _meow.default)(`
      使用方式
        $ fast-gitignore <主题> <...> 选项 [...]

      选项
        --out, -o, '.gitignore' 文件存储位置，默认：'process.cwd()'

      示例
        $ fast-gitignore macOS Windows Linux Node -o .
    `, {
      flags: {
        out: {
          type: 'string',
          alias: 'o'
        },
        help: {
          type: 'boolean',
          alias: 'h'
        }
      }
    });
    (0, _updateNotifier.default)({
      pkg: cli.pkg
    }).notify();
    const {
      input,
      flags
    } = cli;
    const {
      out
    } = flags;

    if (input.length === 0) {
      throw Error('需被 Git 忽略的内容主题');
    }

    let $out = out;

    if ((0, _isEmpty.default)(out)) {
      $out = process.cwd();
    }

    const rslt = await (0, _fastGitignore.default)(input, $out);
    const hint = `
      ${_chalk.default.green.bold(rslt.message)}
      ${_chalk.default.grey(rslt.out)}
    `;
    console.log((0, _redent.default)(hint, 2));
  } catch (error) {
    throw error;
  }
})();