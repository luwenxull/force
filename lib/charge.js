import { Vector3 } from 'three';
export default function charge(p1, p2) {
    const distanceSQ = Math.pow(p1.position.distanceTo(p2.position), 2);
    const tmp = new Vector3();
    if (distanceSQ !== 0) {
        p1.addForce(tmp.copy(p1.position).sub(p2.position).normalize().multiplyScalar(1 / distanceSQ));
        p2.addForce(tmp.copy(p2.position).sub(p1.position).normalize().multiplyScalar(1 / distanceSQ));
    }
}
