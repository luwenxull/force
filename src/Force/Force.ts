import {IParticle} from "../Particle";

export default interface IForce {
  applyTo(p1: IParticle, p2: IParticle): void
}