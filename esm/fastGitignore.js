"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = require("fs");

var _dirExists = _interopRequireDefault(require("./dirExists"));

var _generateGitignore = _interopRequireDefault(require("./generateGitignore"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @param {Array} ignores - 需被 Git 忽略的内容的主题
 * @param {String} to - `.gitignore` 文件存储位置
 */
const fastGitignore = async (ignores, to) => {
  try {
    if (!(await (0, _dirExists.default)(to))) {
      throw Error('保存位置必须有效');
    }

    await (0, _generateGitignore.default)(ignores, to);
    return {
      message: '成功添加 `.gitignore` 文件',
      out: (0, _fs.realpathSync)(to)
    };
  } catch (err) {
    throw err;
  }
};

var _default = fastGitignore;
exports.default = _default;
module.exports = exports.default;