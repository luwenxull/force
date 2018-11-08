'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
class Force {
  constructor() {
    this._strength = 1;
    this._distance = 10;
  }
  strength(strength) {
    if (strength !== void 0) {
      this._strength = strength;
      return this;
    } else {
      return this._strength;
    }
  }
  distance(distance) {
    if (distance !== void 0) {
      this._distance = distance;
      return this;
    } else {
      return this._distance;
    }
  }
}
exports.default = Force;
