import { Vector3 } from 'three';
const tmp = new Vector3();
export default function charge(p1, p2, constant = 1) {
    const distanceSQ = Math.pow(p1.position.distanceTo(p2.position), 2);
    if (distanceSQ !== 0) {
        const strength = p1.mass * p2.mass * constant / distanceSQ;
        p1.addForce(tmp.copy(p1.position).sub(p2.position).normalize().multiplyScalar(strength));
        p2.addForce(tmp.copy(p2.position).sub(p1.position).normalize().multiplyScalar(strength));
    }
}
