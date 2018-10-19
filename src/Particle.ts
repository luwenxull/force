import Vector3 from './Vector3'

export type ParticleID = string | number

export interface IParticleOption {
  id: ParticleID
  position?: number[] // 位置
  a?: number[] // 加速度
  v?: number[] // 速度
  mass?: number
}

export interface IParticle {
  id: ParticleID
  position: Vector3 // 位置
  a: Vector3 // 加速度
  v: Vector3 // 速度
  mass: number
  move(): IParticle
  accelerate(force: Vector3): IParticle
}

export const DRAG = 1 - 0.03
export const TIME_STEP = 18 / 1000

export default class Particle implements IParticle {
  public id: ParticleID
  public position: Vector3
  public a: Vector3
  public v: Vector3
  public mass: number
  private _a: Vector3 = new Vector3()
  private _v: Vector3 = new Vector3()
  constructor(
    option: IParticleOption | ParticleID
  ) {
    const zero = [0, 0, 0]
    if (typeof option === 'object') {
      const {
        id,
        position = zero,
        v = zero,
        a = zero,
        mass = 1
      } = option
      this.id = id
      this.position = new Vector3(...position)
      this.a = new Vector3(...a)
      this.v = new Vector3(...v)
      this.mass = mass
    } else {
      this.id = option
      this.position = new Vector3(...zero)
      this.a = new Vector3(...zero)
      this.v = new Vector3(...zero)
      this.mass = 1
    }

  }

  /**
   * 模拟运动
   *
   * @returns {Particle}
   * @memberof Particle
   */
  public move(): Particle {
    this.v
      .multiplyScalar(DRAG) // 阻力
      .add(this._a.copy(this.a).multiplyScalar(TIME_STEP)) // 更新速度
    this.position
      .add(this._v.copy(this.v).multiplyScalar(TIME_STEP))
    this.a.set(0, 0, 0) // 加速度归零
    return this
  }

  /**
   * 施加力
   * 只会改变加速度
   *
   * @param {Vector3} force
   * @returns {Particle}
   * @memberof Particle
   */
  public accelerate(force: Vector3): Particle {
    this.a.add(new Vector3().copy(force.multiplyScalar(1 / this.mass)))
    return this
  }
}
