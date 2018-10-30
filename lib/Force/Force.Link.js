"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Vector3_1 = __importDefault(require("../Vector3"));
const util_1 = require("../util");
class ForceLink {
    constructor(strength, expectDistance) {
        this.strength = strength;
        this.expectDistance = expectDistance;
        this.links = [];
        this.linkMap = new Map();
    }
    setLinks(links) {
        this.links = links;
        for (const [source, targets] of links) {
            const sets = util_1.getOrOverwrite(this.linkMap, source, new Set());
            for (let target of targets) {
                sets.add(target);
                util_1.getOrOverwrite(this.linkMap, target, new Set()).add(source);
            }
        }
        return this;
    }
    /**
     *
     * 判断两个粒子是否相关联
     *
     * @param {ParticleID} id1
     * @param {ParticleID} id2
     * @returns {boolean}
     * @memberof ForceLink
     */
    isRelated(id1, id2) {
        if (this.linkMap.has(id1) && this.linkMap.get(id1).has(id2)) {
            return true;
        }
        return false;
    }
    /**
     * 找到有连接关系的节点
     *
     * @param {ParticleID} id
     * @returns {ParticleID[]}
     * @memberof ForceLink
     */
    findRelated(id) {
        if (this.linkMap.has(id)) {
            return Array.from(this.linkMap.get(id));
        }
        else {
            return [];
        }
    }
    applyTo(p1, p2) {
        if (this.isRelated(p1.id, p2.id)) {
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
exports.default = ForceLink;
