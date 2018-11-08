import Force from './Force';
import { IParticle, ParticleID } from '../Particle';
export declare type Links = Array<[ParticleID, ParticleID[]]>;
export default class ForceLink extends Force {
  private _links;
  private _linkMap;
  constructor();
  /**
   * 获取连接
   *
   * @returns {Links}
   * @memberof ForceLink
   */
  links(): Links;
  /**
   *设置连接
   *
   * @param {Links} links
   * @returns {this}
   * @memberof ForceLink
   */
  links(links: Links): this;
  /**
   *
   * 判断两个粒子是否相关联
   *
   * @param {ParticleID} id1
   * @param {ParticleID} id2
   * @returns {boolean}
   * @memberof ForceLink
   */
  isRelated(id1: ParticleID, id2: ParticleID): boolean;
  /**
   * 找到有连接关系的节点
   *
   * @param {ParticleID} id
   * @returns {ParticleID[]}
   * @memberof ForceLink
   */
  findRelated(id: ParticleID): ParticleID[];
  applyTo(p1: IParticle, p2: IParticle): this;
}
