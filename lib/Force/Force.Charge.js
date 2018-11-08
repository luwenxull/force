'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const Force_1 = __importDefault(require('./Force'));
const Vector3_1 = __importDefault(require('../Vector3'));
class ForceCharge extends Force_1.default {
  constructor() {
    super();
  }
  /**
   * 施加力
   * 只会改变加速度
   *
   * @param {IParticle} p1
   * @param {IParticle} p2
   * @returns {this}
   * @memberof ForceCharge
   */
  applyTo(p1, p2) {
    const realDistance = p1.position.distanceTo(p2.position),
      _distance =
        typeof this._distance === 'function'
          ? this._distance(p1, p2)
          : this._distance;
    if (realDistance !== 0 && realDistance < _distance) {
      const _strength =
          typeof this._strength === 'function'
            ? this._strength(p1, p2)
            : this._strength,
        realStrength = _strength / Math.pow(realDistance, 2);
      const tmp = new Vector3_1.default();
      p1.accelerate(
        tmp
          .copy(p1.position)
          .sub(p2.position)
          .normalize()
          .multiplyScalar(realStrength)
      );
      p2.accelerate(
        tmp
          .copy(p2.position)
          .sub(p1.position)
          .normalize()
          .multiplyScalar(realStrength)
      );
    }
    return this;
  }
}
exports.default = ForceCharge;
