import IForce from "./Force";
import { IParticle, ParticleID } from "../Particle";
export declare type Links = Array<[ParticleID, ParticleID[]]>;
export default class ForceLink implements IForce {
    strength: number;
    expectDistance: number;
    links: Links;
    linkMap: Map<ParticleID, Set<ParticleID>>;
    constructor(strength: number, expectDistance: number);
    setLinks(links: Links): this;
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
    applyTo(p1: IParticle, p2: IParticle): void;
}
