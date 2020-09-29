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

var _isArray = _interopRequireDefault(require("lodash/isArray"));

var _isString = _interopRequireDefault(require("lodash/isString"));

var _isEmpty = _interopRequireDefault(require("lodash/isEmpty"));

var _isEqual = _interopRequireDefault(require("lodash/isEqual"));

var _size = _interopRequireDefault(require("lodash/size"));

var _saveFile = _interopRequireDefault(require("./saveFile"));

var _resolveRoot = _interopRequireDefault(require("./resolveRoot"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const generateGitignore = async (ignores, to) => {
  let glob;

  if ((0, _isArray.default)(ignores)) {
    glob = `{${(0, _join.default)(ignores, ',')}}`;
  }

  if ((0, _isArray.default)(ignores) && (0, _isEqual.default)((0, _size.default)(ignores), 1)) {
    const [topic] = ignores;
    glob = topic;
  }

  if ((0, _isString.default)(ignores)) {
    glob = ignores;
  }

  if (!(0, _isArray.default)(ignores) && !(0, _isString.default)(ignores) || (0, _isEmpty.default)(ignores)) {
    throw Error('必须提供内容主题');
  }

  const tplPaths = await (0, _fastGlob.default)([_path.default.join(_path.default.join((0, _callsites.default)()[0].getFileName(), '/../..'), `templates/${glob}.gitignore`)]);
  const tplData = (0, _join.default)(await (0, _pMap.default)(tplPaths, async filePath => {
    const content = await (0, _util.promisify)(_fs.readFile)(filePath, 'utf8');
    return content;
  }, {
    concurrency: 8
  }), '\n\n\n');
  await (0, _saveFile.default)(tplData, (0, _resolveRoot.default)('.gitignore', to));
};

var _default = generateGitignore;
exports.default = _default;
module.exports = exports.default;