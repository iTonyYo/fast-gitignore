export default function isStr(text) {
  return Object.prototype.toString.call(text) === '[object string]';
}
