import { Transform } from "../math/transform.js"
import {
  UNI_CAM_MAT,
  UNI_PROJ_MAT,
  UNI_MODEL_MAT
} from "../constants.js"

export class Mesh {
  transform = new Transform()
  constructor(geometry, material) {
    this.geometry = geometry
    this.material = material
  }
  init(gl) {
    this.geometry.init(gl)
    this.material.init(gl)
  }
  update() {
    this.transform.updateMatrix()
  }
  /**
   * @param {WebGL2RenderingContext} gl
   */
  renderGL(gl, camera, projection) {
    let m = this.material
    
    this.material.activate(gl)
    gl.bindVertexArray(this.geometry.attr.vao)
    gl.uniformMatrix4fv(
      m.uniformLoc[UNI_CAM_MAT], false, camera.raw
    )
    gl.uniformMatrix4fv(
      m.uniformLoc[UNI_PROJ_MAT], false, projection.raw
    )
    gl.uniformMatrix4fv(
      m.uniformLoc[UNI_MODEL_MAT], false, this.transform.matrix.raw
    )
    this.material.renderGL(gl, this.geometry.attr)
    this.material.deactivate(gl)
    gl.bindVertexArray(null)
  }
}