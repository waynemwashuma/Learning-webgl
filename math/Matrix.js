import { mat4 } from "/math/glMatrix.js"

let arr = [],
  arr2 = [],
  arr3 = []
let toRad = Math.PI / 180
export class Matrix {
  constructor() {
    this.raw = mat4.identity(mat4.create())
  }
  rotateX(rad) {
    mat4.rotateX(this.raw, rad)
    return this
  }
  rotateY(rad) {
    mat4.rotateY(this.raw, rad)
    return this
  }
  rotateZ(rad) {
    mat4.rotateZ(this.raw, rad)
    return this
  }
  scale(v) {
    mat4.scale(this.raw, v.toArray(arr))
    return this
  }
  scaleScl(x, y, z) {

  }
  translate(position) {
    mat4.translate(this.raw, position.toArray(arr))
    return this
  }
  compose(position, rotation, scale) {
    mat4.identity(this.raw)
    this.translate(position)
      .rotateX(rotation.x * toRad)
      .rotateY(rotation.y * toRad)
      .rotateZ(rotation.z * toRad)
    return this
  }
  lookAt(eye, target, up) {
    mat4.lookAt(
      eye.toArray(arr),
      target.toArray(arr2),
      up.toArray(arr3)
    )
    return this
  }
  makePerspective(fovy, aspect, near, far) {
    mat4.perspective(fovy, aspect, near, far, this.raw)
    return this
  }
  makeOthorgraphic(left, right, bottom, top, near, far) {
    mat4.ortho(left, right, bottom, top, near, far, this.raw)
    return this
  }
}

console.log(new Matrix().rotateY(Math.PI / 2));