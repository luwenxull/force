import { Vector3 } from "three";
export const DRAG = 1 - 0.03;
export const TIME_STEP = 18 / 1000;
export default class Particle {
    constructor(position = [0, 0, 0], a = [0, 0, 0], v = [0, 0, 0], mass = 1) {
        this.mass = mass;
        this._a = new Vector3();
        this._v = new Vector3();
        this.position = new Vector3(...position);
        this.a = new Vector3(...a);
        this.v = new Vector3(...v);
    }
    /**
     * 模拟运动
     *
     * @returns {Particle}
     * @memberof Particle
     */
    simulate() {
        this.v
            .multiplyScalar(DRAG) // 阻力
            .add(this._a.copy(this.a).multiplyScalar(TIME_STEP)); // 更新速度
        this.position
            .add(this._v.copy(this.v).multiplyScalar(TIME_STEP));
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
        this.a.add(new Vector3().copy(force.multiplyScalar(1 / this.mass)));
        return this;
    }
}
