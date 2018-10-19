import IForce from "./Force";
import { IParticle } from "../Particle";
import Vector3 from "../Vector3";

export default class ForceCharge implements IForce {
  constructor(public strength: number, public maxDistance: number) {

  }

  applyTo(p1: IParticle, p2: IParticle) {
    const distance = p1.position.distanceTo(p2.position)
    if (distance !== 0 && distance < this.maxDistance) {
      const strength = this.strength / distance ** 2
      const tmp = new Vector3()
      p1.accelerate(
        tmp
          .copy(p1.position)
          .sub(p2.position)
          .normalize()
          .multiplyScalar(strength)
      )
      p2.accelerate(
        tmp
          .copy(p2.position)
          .sub(p1.position)
          .normalize()
          .multiplyScalar(strength)
      )
    }
  }
}
