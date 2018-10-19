import IForce from "./Force/Force";
import { IParticle } from "./Particle";

export interface ISimulation {
  particles: IParticle[]
  addParticles(particles: IParticle[]): ISimulation
  addForce(force: IForce): ISimulation
  tick(): void
}

export default class Simulation implements ISimulation {
  public particles: IParticle[] = []
  public forces: IForce[] = []
  constructor() { }

  /**
   * 添加粒子
   *
   * @param {IParticle[]} particles
   * @returns {this}
   * @memberof Simulation
   */
  addParticles(particles: IParticle[]): this {
    this.particles = this.particles.concat(particles)
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

  tick() {
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
    return this
  }
}
