import IForce from "./Force";
import Particle, { IParticle, ParticleID } from "../Particle";
import Vector3 from "../Vector3";
import { getOrOverwrite } from "../util";

type Links = Array<[ParticleID, ParticleID[]]>

export default class ForceLink implements IForce {
  public links: Links = []
  public linkMap: Map<ParticleID, Set<ParticleID>> = new Map()
  constructor(public strength: number, public expectDistance: number) { }

  setLinks(links: Links): this {
    this.links = links
    for (const [source, targets] of links) {
      const sets = getOrOverwrite(this.linkMap, source, new Set())
      for(let target of targets) {
        sets.add(target)
        getOrOverwrite(this.linkMap, target, new Set()).add(source)
      }
    }
    return this
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
  isRelated(id1: ParticleID, id2: ParticleID): boolean {
    if (
      this.linkMap.has(id1) && (this.linkMap.get(id1) as Set<ParticleID>).has(id2)
    ) {
      return true
    }
    return false
  }

  
  /**
   * 找到有连接关系的节点
   *
   * @param {ParticleID} id
   * @returns {ParticleID[]}
   * @memberof ForceLink
   */
  findRelated(id: ParticleID): ParticleID[] {
    if (this.linkMap.has(id)) {
      return Array.from(this.linkMap.get(id) as Set<ParticleID>)
    } else {
      return []
    }
  }

  applyTo(p1: IParticle, p2: IParticle) {
    if (this.isRelated(p1.id, p2.id)) {
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
