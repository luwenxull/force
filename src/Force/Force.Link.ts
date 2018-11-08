import Force from './Force';
import { IParticle, ParticleID } from '../Particle';
import Vector3 from '../Vector3';
import { getOrOverwrite } from '../util';

export type Links = Array<[ParticleID, ParticleID[]]>;

export default class ForceLink extends Force {
  private _links: Links = [];
  private _linkMap: Map<ParticleID, Set<ParticleID>> = new Map();
  constructor() {
    super();
  }

  /**
   * 获取连接
   *
   * @returns {Links}
   * @memberof ForceLink
   */
  public links(): Links;
  /**
   *设置连接
   *
   * @param {Links} links
   * @returns {this}
   * @memberof ForceLink
   */
  public links(links: Links): this;
  public links(links?: Links): this | Links {
    if (links !== void 0) {
      this._links = links;
      for (const [source, targets] of links) {
        const sets = getOrOverwrite(this._linkMap, source, new Set());
        for (let target of targets) {
          sets.add(target);
          // 补全反向连接
          getOrOverwrite(this._linkMap, target, new Set()).add(source);
        }
      }
      return this;
    } else {
      return this._links;
    }
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
  public isRelated(id1: ParticleID, id2: ParticleID): boolean {
    if (
      this._linkMap.has(id1) &&
      (this._linkMap.get(id1) as Set<ParticleID>).has(id2)
    ) {
      return true;
    }
    return false;
  }

  /**
   * 找到有连接关系的节点
   *
   * @param {ParticleID} id
   * @returns {ParticleID[]}
   * @memberof ForceLink
   */
  public findRelated(id: ParticleID): ParticleID[] {
    if (this._linkMap.has(id)) {
      return Array.from(this._linkMap.get(id) as Set<ParticleID>);
    } else {
      return [];
    }
  }

  public applyTo(p1: IParticle, p2: IParticle): this {
    if (this.isRelated(p1.id, p2.id)) {
      const realDistance = p1.position.distanceTo(p2.position),
        _distance =
          typeof this._distance === 'function'
            ? this._distance(p1, p2)
            : this._distance,
        _strength =
          typeof this._strength === 'function'
            ? this._strength(p1, p2)
            : this._strength,
        realStrength = _strength * (realDistance - _distance);
      const tmp = new Vector3();
      p2.accelerate(
        tmp
          .copy(p1.position)
          .sub(p2.position)
          .normalize()
          .multiplyScalar(realStrength)
      );
      p1.accelerate(
        tmp
          .copy(p2.position)
          .sub(p1.position)
          .normalize()
          .multiplyScalar(realStrength)
      );
    }
    return this;
  }
}
