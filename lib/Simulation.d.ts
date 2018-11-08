import Force from './Force/Force';
import { IParticle } from './Particle';
import { IEnv } from './env';
export interface ISimulation {
  ENV: IEnv;
  particles: IParticle[];
  forces: Force[];
  addParticles(particles: IParticle[], needInit: boolean): ISimulation;
  addForce(force: Force): ISimulation;
  clearParticles(): ISimulation;
  clearForce(): ISimulation;
  addEnv(env: IEnv): ISimulation;
  evolve(cb?: () => void): ISimulation;
  stopAt(count: number, cb?: () => void): ISimulation;
}
export default class Simulation implements ISimulation {
  ENV: IEnv;
  particles: IParticle[];
  forces: Force[];
  private _stop;
  private _count;
  private _stop_callback;
  constructor();
  /**
   * 添加粒子
   *
   * @param {IParticle[]} particles
   * @param {boolean} [autoPosition=true]
   * @returns {this}
   * @memberof Simulation
   */
  addParticles(particles: IParticle[], autoPosition?: boolean): this;
  /**
   * 清除粒子
   *
   * @returns {this}
   * @memberof Simulation
   */
  clearParticles(): this;
  /**
   * 添加力模型
   *
   * @param {Force} force
   * @returns {this}
   * @memberof Simulation
   */
  addForce(force: Force): this;
  /**
   * 清除力模型
   *
   * @returns {this}
   * @memberof Simulation
   */
  clearForce(): this;
  /**
   * 模拟每一帧
   *
   * @param {() => void} [cb]
   * @returns {this}
   * @memberof Simulation
   */
  evolve(cb?: () => void): this;
  /**
   * 设置最大迭代次数
   *
   * @param {number} count
   * @param {() => void} [cb]
   * @returns {this}
   * @memberof Simulation
   */
  stopAt(count: number, cb?: () => void): this;
  /**
   * 配置环境
   *
   * @param {IEnv} env
   * @returns {this}
   * @memberof Simulation
   */
  addEnv(env: IEnv): this;
}
