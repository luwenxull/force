'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const util_1 = require('./util');
const env_1 = __importDefault(require('./env'));
class Simulation {
  constructor() {
    this.ENV = env_1.default();
    this.particles = [];
    this.forces = [];
    this._stop = 0;
    this._count = 0;
    this._stop_callback = null;
  }
  /**
   * 添加粒子
   *
   * @param {IParticle[]} particles
   * @param {boolean} [autoPosition=true]
   * @returns {this}
   * @memberof Simulation
   */
  addParticles(particles, autoPosition = true) {
    if (autoPosition) {
      util_1.uniform3dDistribution(particles);
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
   * @param {Force} force
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
   * @param {() => void} [cb]
   * @returns {this}
   * @memberof Simulation
   */
  evolve(cb) {
    if (this._count < this._stop) {
      this._count++;
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
        p.move(this.ENV);
      }
      if (cb) {
        cb();
      }
      if (this._count === this._stop && this._stop_callback) {
        this._stop_callback();
      }
    }
    return this;
  }
  /**
   * 设置最大迭代次数
   *
   * @param {number} count
   * @param {() => void} [cb]
   * @returns {this}
   * @memberof Simulation
   */
  stopAt(count, cb) {
    this._stop = count;
    cb && (this._stop_callback = cb);
    return this;
  }
  /**
   * 配置环境
   *
   * @param {IEnv} env
   * @returns {this}
   * @memberof Simulation
   */
  addEnv(env) {
    this.ENV = env;
    return this;
  }
}
exports.default = Simulation;
