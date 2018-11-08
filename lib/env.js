'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const DEFAULT_ENV = {
  DRAG: 0.97,
  TIME_STEP: 0.018
};
function default_1(option = {}) {
  return Object.assign({}, DEFAULT_ENV, option);
}
exports.default = default_1;
