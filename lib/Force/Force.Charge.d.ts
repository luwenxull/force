import Force from './Force';
import { IParticle } from '../Particle';
export default class ForceCharge extends Force {
  constructor();
  /**
   * 施加力
   * 只会改变加速度
   *
   * @param {IParticle} p1
   * @param {IParticle} p2
   * @returns {this}
   * @memberof ForceCharge
   */
  applyTo(p1: IParticle, p2: IParticle): this;
}
