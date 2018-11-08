'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const Force_1 = __importDefault(require('./Force'));
const Vector3_1 = __importDefault(require('../Vector3'));
const util_1 = require('../util');
class ForceLink extends Force_1.default {
  constructor() {
    super();
    this._links = [];
    this._linkMap = new Map();
  }
  links(links) {
    if (links !== void 0) {
      this._links = links;
      for (const [source, targets] of links) {
        const sets = util_1.getOrOverwrite(this._linkMap, source, new Set());
        for (let target of targets) {
          sets.add(target);
          // 补全反向连接
          util_1.getOrOverwrite(this._linkMap, target, new Set()).add(source);
        }
      }
      return this;
    } else {
      return this._links;
    }
  }
  /**
   *
   * 判断两个粒子是否相关联
   *
   * @param {ParticleID} id1
   * @param {ParticleID} id2
   * @returns {boolean}
   * @memberof ForceLink
   */
  isRelated(id1, id2) {
    if (this._linkMap.has(id1) && this._linkMap.get(id1).has(id2)) {
      return true;
    }
    return false;
  }
  /**
   * 找到有连接关系的节点
   *
   * @param {ParticleID} id
   * @returns {ParticleID[]}
   * @memberof ForceLink
   */
  findRelated(id) {
    if (this._linkMap.has(id)) {
      return Array.from(this._linkMap.get(id));
    } else {
      return [];
    }
  }
  applyTo(p1, p2) {
    if (this.isRelated(p1.id, p2.id)) {
      const realDistance = p1.position.distanceTo(p2.position),
        _distance =
          typeof this._distance === 'function'
            ? this._distance(p1, p2)
            : this._distance,
        _strength =
          typeof this._strength === 'function'
            ? this._strength(p1, p2)
            : this._strength,
        realStrength = _strength * (realDistance - _distance);
      const tmp = new Vector3_1.default();
      p2.accelerate(
        tmp
          .copy(p1.position)
          .sub(p2.position)
          .normalize()
          .multiplyScalar(realStrength)
      );
      p1.accelerate(
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
exports.default = ForceLink;
