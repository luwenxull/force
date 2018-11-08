import Force from './Force';
import { IParticle } from '../Particle';
import Vector3 from '../Vector3';

export default class ForceCharge extends Force {
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
  public applyTo(p1: IParticle, p2: IParticle): this {
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
        realStrength = _strength / realDistance ** 2;
      const tmp = new Vector3();
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
