"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Vector3_1 = __importDefault(require("../Vector3"));
class ForceCharge {
    constructor(strength, maxDistance) {
        this.strength = strength;
        this.maxDistance = maxDistance;
    }
    applyTo(p1, p2) {
        const distance = p1.position.distanceTo(p2.position);
        if (distance !== 0 && distance < this.maxDistance) {
            const strength = this.strength / Math.pow(distance, 2);
            const tmp = new Vector3_1.default();
            p1.accelerate(tmp
                .copy(p1.position)
                .sub(p2.position)
                .normalize()
                .multiplyScalar(strength));
            p2.accelerate(tmp
                .copy(p2.position)
                .sub(p1.position)
                .normalize()
                .multiplyScalar(strength));
        }
    }
}
exports.default = ForceCharge;
