import IForce from "./Force/Force";
import { IParticle } from "./Particle";
export interface ISimulation {
    particles: IParticle[];
    addParticles(particles: IParticle[], needInit: boolean): ISimulation;
    addForce(force: IForce): ISimulation;
    clearParticles(): ISimulation;
    clearForce(): ISimulation;
    evolve(cb?: () => void): ISimulation;
    stopAt(count: number, cb?: () => void): ISimulation;
}
export default class Simulation implements ISimulation {
    particles: IParticle[];
    forces: IForce[];
    private _stop;
    private _count;
    private _stop_callback;
    constructor();
    /**
     * 添加粒子
     *
     * @param {IParticle[]} particles
     * @returns {this}
     * @memberof Simulation
     */
    addParticles(particles: IParticle[], needInit?: boolean): this;
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
     * @param {IForce} force
     * @returns {this}
     * @memberof Simulation
     */
    addForce(force: IForce): this;
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
}
