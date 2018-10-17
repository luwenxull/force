import Vector3 from './Vector3'
import IParticle from './Particle'

const tmp = new Vector3()

export default function link(p1: IParticle, p2: IParticle, expect: number, constant: number = 1): void {
  const distance = p1.position.distanceTo(p2.position)
  if (distance > expect) {
    const strength = constant * (distance - expect)
    p2.addForce(tmp.copy(p1.position).sub(p2.position).normalize().multiplyScalar(strength))
    p1.addForce(tmp.copy(p2.position).sub(p1.position).normalize().multiplyScalar(strength))
  }
}