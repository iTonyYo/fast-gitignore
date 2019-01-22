"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _util = require("util");

var _fs = require("fs");

var _path = _interopRequireDefault(require("path"));

var _callsites = _interopRequireDefault(require("callsites"));

var _join = _interopRequireDefault(require("lodash/join"));

var _fastGlob = _interopRequireDefault(require("fast-glob"));

var _pMap = _interopRequireDefault(require("p-map"));

var _saveFile = _interopRequireDefault(require("./saveFile"));

var _resolveRoot = _interopRequireDefault(require("./resolveRoot"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const generateGitignore = async (ignores, to) => {
  try {
    const tplPaths = await (0, _fastGlob.default)([_path.default.join(_path.default.join((0, _callsites.default)()[0].getFileName(), '/../..'), `templates/{${(0, _join.default)(ignores, ',')}}.gitignore`)]);
    const tplData = (0, _join.default)((await (0, _pMap.default)(tplPaths, async filePath => {
      const content = await (0, _util.promisify)(_fs.readFile)(filePath, 'utf8');
      return content;
    }, {
      concurrency: 8
    })), '\n\n\n');
    await (0, _saveFile.default)(tplData, (0, _resolveRoot.default)('.gitignore', to));
  } catch (error) {
    throw error;
  }
};

var _default = generateGitignore;
exports.default = _default;
module.exports = exports.default;