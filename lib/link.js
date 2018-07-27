"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const three_1 = require("three");
const tmp = new three_1.Vector3();
function link(p1, p2, expect, constant = 1) {
    const distance = p1.position.distanceTo(p2.position);
    if (distance > expect) {
        const strength = constant * (distance - expect);
        p2.addForce(tmp.copy(p1.position).sub(p2.position).normalize().multiplyScalar(strength));
        p1.addForce(tmp.copy(p2.position).sub(p1.position).normalize().multiplyScalar(strength));
    }
}
exports.default = link;
