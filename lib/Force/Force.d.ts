import { IParticle } from '../Particle';
export declare type Strength =
  | number
  | ((p1: IParticle, p2: IParticle) => number);
export declare type Distance =
  | number
  | ((p1: IParticle, p2: IParticle) => number);
export interface IForce {
  strength(): Strength;
  strength(strength: Strength): IForce;
  distance(): Distance;
  distance(distance: Distance): IForce;
  applyTo(p1: IParticle, p2: IParticle): IForce;
}
export default abstract class Force implements IForce {
  protected _strength: Strength;
  protected _distance: Distance;
  constructor();
  /**
   * 获取strength
   *
   * @returns {Strength}
   * @memberof ForceCharge
   */
  strength(): Strength;
  /**
   * 设置strength
   *
   * @param {Strength} strength
   * @returns {this}
   * @memberof ForceCharge
   */
  strength(strength: Strength): this;
  /**
   * 获取最大距离
   *
   * @returns {number}
   * @memberof ForceCharge
   */
  distance(): Distance;
  /**
   * 设置最大距离
   *
   * @param {number} distance
   * @returns {this}
   * @memberof ForceCharge
   */
  distance(distance: Distance): this;
  abstract applyTo(p1: IParticle, p2: IParticle): this;
}
