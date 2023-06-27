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
  scaleX(x) {
    arr[0] = x
    arr[1] = 1
    arr[2] = 1
    mat4.scale(this.raw, arr)
    return this
  }
  scaleY(x) {
    arr[0] = 1
    arr[1] = x
    arr[2] = 1
    mat4.scale(this.raw, arr)
    return this
  }
  scaleZ(x) {
    arr[0] = 1
    arr[1] = 1
    arr[2] = x
    mat4.scale(this.raw, arr)
    return this
  }
  translate(position) {
    mat4.translate(this.raw, position.toArray(arr))
    return this
  }
  translateX(x) {
    arr[0] = x
    arr[1] = 0
    arr[2] = 0
    mat4.translate(this.raw, arr)
    return this
  }
  translateY(x) {
    arr[0] = 0
    arr[1] = x
    arr[2] = 0
    mat4.translate(this.raw, arr)
    return this
  }
  translateZ(x) {
    arr[0] = 0
    arr[1] = 0
    arr[2] = x
    mat4.translate(this.raw, arr)

    return this
  }
  inverse() {
    mat4.inverse(this.raw)
    return this
  }
  transpose() {
    mat4.transpose(this.raw)
    return this
  }
  compose(position, rotation, scale) {
    mat4.identity(this.raw)
    this.rotateX(rotation.x)
      .rotateY(rotation.y)
      .rotateZ(rotation.z)
      .scale(scale)
      .translate(position)
    return this
  }
  identity() {
    mat4.identity(this.raw)
    return
  }
  copy(m) {
    mat4.set(m.raw, this.raw)
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