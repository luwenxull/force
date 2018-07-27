"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const three_1 = require("three");
exports.DRAG = 1 - 0.03;
exports.TIME_STEP = 18 / 1000;
class Particle {
    constructor(position = [0, 0, 0], a = [0, 0, 0], v = [0, 0, 0], mass = 1) {
        this.mass = mass;
        this._a = new three_1.Vector3();
        this._v = new three_1.Vector3();
        this.position = new three_1.Vector3(...position);
        this.a = new three_1.Vector3(...a);
        this.v = new three_1.Vector3(...v);
    }
    /**
     * 模拟运动
     *
     * @returns {Particle}
     * @memberof Particle
     */
    simulate() {
        this.v
            .multiplyScalar(exports.DRAG) // 阻力
            .add(this._a.copy(this.a).multiplyScalar(exports.TIME_STEP)); // 更新速度
        this.position
            .add(this._v.copy(this.v).multiplyScalar(exports.TIME_STEP));
        this.a.set(0, 0, 0); // 加速度归零
        return this;
    }
    /**
     * 施加力
     * 最终会转换成加速度
     *
     * @param {Vector3} force
     * @returns {Particle}
     * @memberof Particle
     */
    addForce(force) {
        this.a.add(new three_1.Vector3().copy(force.multiplyScalar(1 / this.mass)));
        return this;
    }
}
exports.default = Particle;
