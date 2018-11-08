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

export type IVectorConstructor = new (
  x?: number,
  y?: number,
  z?: number
) => IVector3;

export default class Vector3 implements IVector3 {
  constructor(
    public x: number = 0,
    public y: number = 0,
    public z: number = 0
  ) {}

  multiplyScalar(scalar: number): this {
    this.x *= scalar;
    this.y *= scalar;
    this.z *= scalar;
    return this;
  }

  set(x: number, y: number, z: number): this {
    this.x = x;
    this.y = y;
    this.z = z;
    return this;
  }

  copy(vector3: IVector3): IVector3 {
    return new Vector3(vector3.x, vector3.y, vector3.z);
  }

  add(vector3: IVector3): this {
    this.x += vector3.x;
    this.y += vector3.y;
    this.z += vector3.z;
    return this;
  }

  sub(vector3: IVector3): this {
    this.x -= vector3.x;
    this.y -= vector3.y;
    this.z -= vector3.z;
    return this;
  }

  toArray(array: Array<any> = [], offset: number = 0): Array<any> {
    const xyz = [this.x, this.y, this.z];
    for (let item of xyz) {
      array[offset++] = item;
    }
    return array;
  }

  length(): number {
    return Math.sqrt(this.x ** 2 + this.y ** 2 + this.z ** 2);
  }

  normalize(): this {
    const length = this.length();
    return this.set(this.x / length, this.y / length, this.z / length);
  }

  distanceTo(v: IVector3): number {
    return Math.sqrt(
      (this.x - v.x) ** 2 + (this.y - v.y) ** 2 + (this.z - v.z) ** 2
    );
  }
}
