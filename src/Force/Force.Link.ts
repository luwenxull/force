import IForce from "./Force";
import { IParticle, ParticleID } from "../Particle";
import Vector3 from "../Vector3";

export default class Link implements IForce {
  public links: {
    [prop: string]: ParticleID[]
  } = {}
  public linkMap: {
    [prop: string]: {
      [prop: string]: 1
    }
  } = {}
  constructor(public strength: number, public expectDistance: number) { }

  setLinks(links: {
    [prop: string]: ParticleID[]
  }): this {
    this.links = links
    const ids = Object.keys(links)
    ids.forEach(id => {
      const map: {
        [prop: string]: 1
      } = this.linkMap[id] = {}
      for (let targetid of this.links[id]) {
        map[targetid] = 1
      }
    })
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
      this.linkMap[id1] && this.linkMap[id1][id2] ||
      this.linkMap[id2] && this.linkMap[id2][id1]
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
