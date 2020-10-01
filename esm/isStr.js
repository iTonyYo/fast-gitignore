"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isStr;

function isStr(text) {
  return Object.prototype.toString.call(text) === '[object string]';
}

module.exports = exports.default;