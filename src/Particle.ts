import Vector3, { IVector3, IVectorConstructor } from './Vector3';
import { IEnv } from './env';
export type ParticleID = string | number;

type ThreeItemsArray = [number, number, number];

export interface IParticleOption {
  id: ParticleID;
  position?: ThreeItemsArray; // 位置
  a?: ThreeItemsArray; // 加速度
  v?: ThreeItemsArray; // 速度
  mass?: number;
}

export interface IParticle {
  id: ParticleID;
  position: IVector3; // 位置
  a: IVector3; // 加速度
  v: IVector3; // 速度
  mass: number;
  move(ENV: IEnv): IParticle;
  accelerate(force: IVector3): IParticle;
  userData<T>(data: T): IParticle;
  userData<T>(): T;
}

export default class Particle implements IParticle {
  public id: ParticleID;
  public position: IVector3;
  public a: IVector3;
  public v: IVector3;
  public mass: number;
  private _a: IVector3;
  private _v: IVector3;
  private _userData: any;
  private VectorConstructor: IVectorConstructor;
  constructor(
    option: IParticleOption | ParticleID,
    Vector: IVectorConstructor = Vector3
  ) {
    this._a = new Vector(0, 0, 0);
    this._v = new Vector(0, 0, 0);
    const zero: ThreeItemsArray = [0, 0, 0];
    if (typeof option === 'object') {
      const { id, position = zero, v = zero, a = zero, mass = 1 } = option;
      this.id = id;
      this.position = new Vector(...position);
      this.a = new Vector(...a);
      this.v = new Vector(...v);
      this.mass = mass;
    } else {
      this.id = option;
      this.position = new Vector(...zero);
      this.a = new Vector(...zero);
      this.v = new Vector(...zero);
      this.mass = 1;
    }
    this.VectorConstructor = Vector;
  }

  /**
   * 模拟运动
   *
   * @returns {Particle}
   * @memberof Particle
   */
  public move(ENV: IEnv): Particle {
    this.v
      .multiplyScalar(ENV.DRAG) // 阻力
      .add(this._a.copy(this.a).multiplyScalar(ENV.TIME_STEP)); // 更新速度
    this.position.add(this._v.copy(this.v).multiplyScalar(ENV.TIME_STEP));
    this.a.set(0, 0, 0); // 加速度归零
    return this;
  }

  /**
   * 施加力
   * 只会改变加速度
   *
   * @param {IVector3} force
   * @returns {Particle}
   * @memberof Particle
   */
  public accelerate(force: IVector3): Particle {
    this.a.add(
      new this.VectorConstructor(0, 0, 0).copy(
        force.multiplyScalar(1 / this.mass)
      )
    );
    return this;
  }

  public userData<T>(): T;
  public userData<T>(data: T): this;
  public userData(data?: any): any | this {
    if (data !== undefined) {
      this._userData = data;
      return this;
    } else {
      return this._userData;
    }
  }
}
