import { createVAO } from "./functions.js"

export class Geometry {
  constructor(positions = [], indices, normals, uv) {
    this.indices = indices
    this.positions = positions
    this.normals = normals
    this.uv = uv
    this.attr = null
  }
  /**
   * @param {WebGL2RenderingContext} gl
   */
  init(gl) {
    this.attr = createVAO(gl, this.indices, this.positions, this.normals, this.uv)
  }
}