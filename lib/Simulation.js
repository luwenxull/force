"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const math_1 = require("./math");
class Simulation {
    constructor() {
        this.particles = [];
        this.forces = [];
    }
    /**
     * 添加粒子
     *
     * @param {IParticle[]} particles
     * @returns {this}
     * @memberof Simulation
     */
    addParticles(particles, needInit = true) {
        if (needInit) {
            math_1.uniform3dDistribution(particles);
        }
        this.particles = this.particles.concat(particles);
        return this;
    }
    /**
     * 清除粒子
     *
     * @returns {this}
     * @memberof Simulation
     */
    clearParticles() {
        this.particles = [];
        return this;
    }
    /**
     * 添加力模型
     *
     * @param {IForce} force
     * @returns {this}
     * @memberof Simulation
     */
    addForce(force) {
        this.forces.push(force);
        return this;
    }
    /**
     * 清除力模型
     *
     * @returns {this}
     * @memberof Simulation
     */
    clearForce() {
        this.forces = [];
        return this;
    }
    /**
     * 模拟每一帧
     *
     * @returns
     * @memberof Simulation
     */
    tick() {
        const l = this.particles.length;
        for (let i = 0; i < l; i++) {
            const p1 = this.particles[i];
            for (let j = i + 1; j < l; j++) {
                const p2 = this.particles[j];
                for (let force of this.forces) {
                    force.applyTo(p1, p2);
                }
            }
        }
        for (let p of this.particles) {
            p.move();
        }
        return this;
    }
}
exports.default = Simulation;
