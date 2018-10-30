export interface IVector3 {
    x: number;
    y: number;
    z: number;
    multiplyScalar(scalar: number): this;
    set(x: number, y: number, z: number): this;
    copy(vector3: IVector3): IVector3;
    add(vector3: IVector3): this;
    sub(vector3: IVector3): this;
    toArray(array?: Array<any>, offset?: number): Array<any>;
    length(): number;
    normalize(): this;
    distanceTo(v: IVector3): number;
}
export declare type IVectorConstructor = new (x?: number, y?: number, z?: number) => IVector3;
export default class Vector3 implements IVector3 {
    x: number;
    y: number;
    z: number;
    constructor(x?: number, y?: number, z?: number);
    multiplyScalar(scalar: number): this;
    set(x: number, y: number, z: number): this;
    copy(vector3: IVector3): IVector3;
    add(vector3: IVector3): this;
    sub(vector3: IVector3): this;
    toArray(array?: Array<any>, offset?: number): Array<any>;
    length(): number;
    normalize(): this;
    distanceTo(v: IVector3): number;
}
