'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
class Vector3 {
  constructor(x = 0, y = 0, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
  multiplyScalar(scalar) {
    this.x *= scalar;
    this.y *= scalar;
    this.z *= scalar;
    return this;
  }
  set(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
    return this;
  }
  copy(vector3) {
    return new Vector3(vector3.x, vector3.y, vector3.z);
  }
  add(vector3) {
    this.x += vector3.x;
    this.y += vector3.y;
    this.z += vector3.z;
    return this;
  }
  sub(vector3) {
    this.x -= vector3.x;
    this.y -= vector3.y;
    this.z -= vector3.z;
    return this;
  }
  toArray(array = [], offset = 0) {
    const xyz = [this.x, this.y, this.z];
    for (let item of xyz) {
      array[offset++] = item;
    }
    return array;
  }
  length() {
    return Math.sqrt(
      Math.pow(this.x, 2) + Math.pow(this.y, 2) + Math.pow(this.z, 2)
    );
  }
  normalize() {
    const length = this.length();
    return this.set(this.x / length, this.y / length, this.z / length);
  }
  distanceTo(v) {
    return Math.sqrt(
      Math.pow(this.x - v.x, 2) +
        Math.pow(this.y - v.y, 2) +
        Math.pow(this.z - v.z, 2)
    );
  }
}
exports.default = Vector3;
