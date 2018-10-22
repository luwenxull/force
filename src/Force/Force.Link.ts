import IForce from "./Force";
import { IParticle, ParticleID } from "../Particle";
import Vector3 from "../Vector3";

type Links = Array<[ParticleID, ParticleID[]]>

export default class ForceLink implements IForce {
  public links: Links = []
  public linkMap: Map<ParticleID, Set<ParticleID>> = new Map()
  constructor(public strength: number, public expectDistance: number) { }

  setLinks(links: Links): this {
    this.links = links
    for (const [source, targets] of links) {
      this.linkMap.set(source, new Set(targets))
    }
    return this
  }

  /**
   *
   * 判断两个粒子是否相关联
   * @param {IParticle} p1
   * @param {IParticle} p2
   * @returns {boolean}
   * @memberof Link
   */
  isRelated(p1: IParticle, p2: IParticle): boolean {
    const id1 = p1.id, id2 = p2.id
    if (
      this.linkMap.has(id1) && (this.linkMap.get(id1) as Set<ParticleID>).has(id2) ||
      this.linkMap.has(id2) && (this.linkMap.get(id2) as Set<ParticleID>).has(id1)
    ) {
      return true
    }
    return false
  }

  applyTo(p1: IParticle, p2: IParticle) {
    if (this.isRelated(p1, p2)) {
      const distance = p1.position.distanceTo(p2.position)
      const strength = this.strength * (distance - this.expectDistance)
      const tmp = new Vector3()
      p2.accelerate(
        tmp
          .copy(p1.position)
          .sub(p2.position)
          .normalize()
          .multiplyScalar(strength)
      )
      p1.accelerate(
        tmp
          .copy(p2.position)
          .sub(p1.position)
          .normalize()
          .multiplyScalar(strength)
      )
    }
  }
}
