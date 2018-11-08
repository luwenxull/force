import { IParticle } from '../Particle';

export type Strength = number | ((p1: IParticle, p2: IParticle) => number);
export type Distance = number | ((p1: IParticle, p2: IParticle) => number);

export interface IForce {
  strength(): Strength;
  strength(strength: Strength): IForce;
  distance(): Distance;
  distance(distance: Distance): IForce;
  applyTo(p1: IParticle, p2: IParticle): IForce;
}

export default abstract class Force implements IForce {
  protected _strength: Strength = 1;
  protected _distance: Distance = 10;
  constructor() {}
  /**
   * 获取strength
   *
   * @returns {Strength}
   * @memberof ForceCharge
   */
  public strength(): Strength;
  /**
   * 设置strength
   *
   * @param {Strength} strength
   * @returns {this}
   * @memberof ForceCharge
   */
  public strength(strength: Strength): this;
  public strength(strength?: Strength): this | Strength {
    if (strength !== void 0) {
      this._strength = strength;
      return this;
    } else {
      return this._strength;
    }
  }

  /**
   * 获取最大距离
   *
   * @returns {number}
   * @memberof ForceCharge
   */
  public distance(): Distance;
  /**
   * 设置最大距离
   *
   * @param {number} distance
   * @returns {this}
   * @memberof ForceCharge
   */
  public distance(distance: Distance): this;
  public distance(distance?: Distance): Distance | this {
    if (distance !== void 0) {
      this._distance = distance;
      return this;
    } else {
      return this._distance;
    }
  }

  abstract applyTo(p1: IParticle, p2: IParticle): this;
}
