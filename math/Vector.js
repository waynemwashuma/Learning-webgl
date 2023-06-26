export class Vector {
  constructor(x, y, z) {
    this.x = x || 0
    this.y = y || 0
    this.z = z || 0
  }
  toArray(arr, offset = 0) {
    arr[offset] = this.x
    arr[offset + 1] = this.y
    arr[offset + 2] = this.z
    return arr
  }
  fromArray(arr, offset = 0) {
    this.x = arr[offset]
    this.y = arr[offset + 1]
    this.z = arr[offset + 2]
    return this
  }
  magnitudeSq() {
    return this.x * this.x + this.y * this.y + this.z * this.z;
  }

  magnitude() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }
  normalize() {
    let l = this.magnitude()
    this.x /= l
    this.y /= l
    this.z /= l
		return this

	}
}