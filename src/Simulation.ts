import IForce from "./Force/Force";
import { IParticle } from "./Particle";
import { uniform3dDistribution } from "./math";

export interface ISimulation {
  particles: IParticle[]
  addParticles(particles: IParticle[], needInit: boolean): ISimulation
  addForce(force: IForce): ISimulation
  clearParticles(): ISimulation
  clearForce(): ISimulation
  evolve(cb?: () => void): ISimulation
  stopAt(count: number, cb?: () => void): ISimulation
}

export default class Simulation implements ISimulation {
  public particles: IParticle[] = []
  public forces: IForce[] = []
  private _stop: number = 0
  private _count: number = 0
  private _stop_callback: (() => void) | null = null
  constructor() {
  }

  /**
   * 添加粒子
   *
   * @param {IParticle[]} particles
   * @returns {this}
   * @memberof Simulation
   */
  addParticles(particles: IParticle[], needInit = true): this {
    if (needInit) {
      uniform3dDistribution(particles)
    }
    this.particles = this.particles.concat(particles)
    return this
  }

  /**
   * 清除粒子
   *
   * @returns {this}
   * @memberof Simulation
   */
  clearParticles(): this {
    this.particles = []
    return this
  }

  /**
   * 添加力模型
   *
   * @param {IForce} force
   * @returns {this}
   * @memberof Simulation
   */
  addForce(force: IForce): this {
    this.forces.push(force)
    return this
  }

  /**
   * 清除力模型
   *
   * @returns {this}
   * @memberof Simulation
   */
  clearForce(): this {
    this.forces = []
    return this
  }

  /**
   * 模拟每一帧
   *
   * @param {() => void} [cb]
   * @returns {this}
   * @memberof Simulation
   */
  evolve(cb?: () => void): this {
    if (this._count < this._stop) {
      this._count ++
      const l = this.particles.length
      for (let i = 0; i < l; i++) {
        const p1 = this.particles[i]
        for (let j = i + 1; j < l; j++) {
          const p2 = this.particles[j]
          for (let force of this.forces) {
            force.applyTo(p1, p2)
          }
        }
      }
      for (let p of this.particles) {
        p.move()
      }
      if (cb) {
        cb()
      }
      if (this._count === this._stop && this._stop_callback) {
        this._stop_callback()
      }
    }
    return this
  }


  /**
   * 设置最大迭代次数
   *
   * @param {number} count
   * @param {() => void} [cb]
   * @returns {this}
   * @memberof Simulation
   */
  stopAt(count: number, cb?: () => void): this {
    this._stop = count
    cb && (this._stop_callback = cb)
    return this
  }
}
