"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Vector3_1 = __importDefault(require("../Vector3"));
class Link {
    constructor(strength, expectDistance) {
        this.strength = strength;
        this.expectDistance = expectDistance;
        this.links = {};
        this.linkMap = {};
    }
    setLinks(links) {
        this.links = links;
        const ids = Object.keys(links);
        ids.forEach(id => {
            const map = this.linkMap[id] = {};
            for (let targetid of this.links[id]) {
                map[targetid] = 1;
            }
        });
        return this;
    }
    /**
     *
     * 判断两个粒子是否相关联
     * @param {IParticle} p1
     * @param {IParticle} p2
     * @returns {boolean}
     * @memberof Link
     */
    isRelated(p1, p2) {
        const id1 = p1.id, id2 = p2.id;
        if (this.linkMap[id1] && this.linkMap[id1][id2] ||
            this.linkMap[id2] && this.linkMap[id2][id1]) {
            return true;
        }
        return false;
    }
    applyTo(p1, p2) {
        if (this.isRelated(p1, p2)) {
            const distance = p1.position.distanceTo(p2.position);
            const strength = this.strength * (distance - this.expectDistance);
            const tmp = new Vector3_1.default();
            p2.accelerate(tmp
                .copy(p1.position)
                .sub(p2.position)
                .normalize()
                .multiplyScalar(strength));
            p1.accelerate(tmp
                .copy(p2.position)
                .sub(p1.position)
                .normalize()
                .multiplyScalar(strength));
        }
    }
}
exports.default = Link;
