export class Mesh {
  constructor(geometry, material) {
    this.geometry = geometry
    this.material = material
  }
  init(gl){
    this.geometry.init(gl)
    this.material.init(gl)
  }
  preRender() {}
  /**
   * @param {WebGL2RenderingContext} gl
   */
  renderGL(gl) {
    gl.bindVertexArray(this.geometry.attr.vao)
    this.material.activate(gl)
    for (var name in this.material.uniforms) {
       let u = this.material.uniforms[name]
       gl["uniform"+u.type](u.location,u.value)
    }
    this.material.renderGL(gl,this.geometry.attr)
    this.material.deactivate(gl)
    gl.bindVertexArray(null)
  }
}