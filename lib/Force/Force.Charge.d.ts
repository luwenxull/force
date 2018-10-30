import IForce from "./Force";
import { IParticle } from "../Particle";
export default class ForceCharge implements IForce {
    strength: number;
    maxDistance: number;
    constructor(strength: number, maxDistance: number);
    applyTo(p1: IParticle, p2: IParticle): void;
}
