import { Vector3 } from "three";

export interface IParticle {
  position: Vector3 // 位置
  a: Vector3 // 加速度
  v: Vector3 // 速度
  mass: number
}

export const DRAG = 1 - 0.03
export const TIME_STEP = 18 / 1000

export default class Particle implements IParticle {
  public position: Vector3
  public a: Vector3
  public v: Vector3
  private _a: Vector3 = new Vector3()
  private _v: Vector3 = new Vector3()
  constructor(
    position: number[] = [0, 0, 0],
    a: number[] = [0, 0, 0],
    v: number[] = [0, 0, 0],
    public mass: number = 1,
  ) {
    this.position = new Vector3(...position)
    this.a = new Vector3(...a)
    this.v = new Vector3(...v)
  }

  /**
   * 将position，a，v复制到目标对象上
   *
   * @param {{
   *     [prop: string]: any
   *   }} target
   * @returns {Particle}
   * @memberof Particle
   */
  public copyTo(target: {
    [prop: string]: any
  }): Particle {
    target.position = this.position
    target.a = this.a
    target.v = this.v
    return this
  }

  /**
   * 模拟运动
   *
   * @returns {Particle}
   * @memberof Particle
   */
  public simulate(): Particle {
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
   * 最终会转换成加速度
   *
   * @param {Vector3} force
   * @returns {Particle}
   * @memberof Particle
   */
  public addForce(force: Vector3): Particle {
    this.a.add(new Vector3().copy(force.multiplyScalar(1 / this.mass)))
    return this
  }
}