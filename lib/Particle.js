"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Vector3_1 = __importDefault(require("./Vector3"));
exports.DRAG = 1 - 0.03;
exports.TIME_STEP = 18 / 1000;
class Particle {
    constructor(position = [0, 0, 0], a = [0, 0, 0], v = [0, 0, 0], mass = 1) {
        this.mass = mass;
        this._a = new Vector3_1.default();
        this._v = new Vector3_1.default();
        this.position = new Vector3_1.default(...position);
        this.a = new Vector3_1.default(...a);
        this.v = new Vector3_1.default(...v);
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
        this.a.add(new Vector3_1.default().copy(force.multiplyScalar(1 / this.mass)));
        return this;
    }
}
exports.default = Particle;
