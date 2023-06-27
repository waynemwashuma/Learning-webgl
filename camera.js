import { Matrix } from "/math/Matrix.js"
import { Transform } from "/math/transform.js"

export class Camera {
  transform = new Transform()
  projection = new Matrix()
  view = new Matrix()
  constructor() {
    //this.updateProjection()
  }
  updateMatrix(){
    this.transform.updateMatrix()
    this.view.copy(this.transform.matrix).inverse()
  }
  updateProjection(fov = 45,near = 0.1,far= 1000) {
    this.projection.makePerspective(fov,9/6,near,far)
  }
}