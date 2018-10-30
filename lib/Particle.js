"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Vector3_1 = __importDefault(require("./Vector3"));
const env_1 = require("./env");
class Particle {
    constructor(option, Vector = Vector3_1.default) {
        this._a = new Vector(0, 0, 0);
        this._v = new Vector(0, 0, 0);
        const zero = [0, 0, 0];
        if (typeof option === 'object') {
            const { id, position = zero, v = zero, a = zero, mass = 1 } = option;
            this.id = id;
            this.position = new Vector(...position);
            this.a = new Vector(...a);
            this.v = new Vector(...v);
            this.mass = mass;
        }
        else {
            this.id = option;
            this.position = new Vector(...zero);
            this.a = new Vector(...zero);
            this.v = new Vector(...zero);
            this.mass = 1;
        }
        this.VectorConstructor = Vector;
    }
    /**
     * 模拟运动
     *
     * @returns {Particle}
     * @memberof Particle
     */
    move() {
        this.v
            .multiplyScalar(env_1.ENV.DRAG) // 阻力
            .add(this._a.copy(this.a).multiplyScalar(env_1.ENV.TIME_STEP)); // 更新速度
        this.position
            .add(this._v.copy(this.v).multiplyScalar(env_1.ENV.TIME_STEP));
        this.a.set(0, 0, 0); // 加速度归零
        return this;
    }
    /**
     * 施加力
     * 只会改变加速度
     *
     * @param {IVector3} force
     * @returns {Particle}
     * @memberof Particle
     */
    accelerate(force) {
        this.a.add(new this.VectorConstructor(0, 0, 0).copy(force.multiplyScalar(1 / this.mass)));
        return this;
    }
    userData(data) {
        if (data !== undefined) {
            this._userData = data;
            return this;
        }
        else {
            return this._userData;
        }
    }
}
exports.default = Particle;
