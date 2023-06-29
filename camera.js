import { Matrix } from "/math/Matrix.js"
import { Transform } from "/math/transform.js"

export class Camera {
  transform = new Transform()
  projection = new Matrix()
  view = new Matrix()
  constructor() {
    //this.updateProjection()
  }
  updateMatrix() {
    this.transform.matrix.identity()
      .translate(this.transform.position)
      .rotateX(this.transform.rotation.x)
      .rotateY(this.transform.rotation.y)
      .rotateZ(this.transform.rotation.z)
    
    this.view.copy(this.transform.matrix).inverse()
  }
  updateProjection(width = 2, height = 2,near = -1000, far = 1000) {
    this.projection.makeOthorgraphic(-width/2,width/2,-height/2, height/2, near, far)
  }
  makePerspective(fov = 45,near = 0.1,far = 1000){
    this.projection.makePerspective(fov,innerWidth/innerHeight, near, far)
  }
}