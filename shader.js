import {
  createProgramFromSrc
} from "./functions.js"


export class Shader {
  /**
   * @param {string} vshaderSrc
   * @param {string} fshaderSrc
   */
  constructor(vshaderSrc, fshaderSrc) {
    this.vSrc = vshaderSrc
    this.fSrc = fshaderSrc
    this.program = null
    this.uniforms = {}
  }
  init(gl) {
    this.program = createProgramFromSrc(gl, this.vSrc, this.fSrc)
  }
  /**
   * @param {WebGL2RenderingContext} gl
   */
  activate(gl) {
    gl.useProgram(this.program)
  }
  /**
   * @param {WebGL2RenderingContext} gl
   */
  deactivate(gl) {
    gl.useProgram(null)
  }
  preRender() {

  }
  /**
   * @param {WebGL2RenderingContext} gl
   */
  render(gl) {
    gl.bindVertexArray(this.attr.vao)
    if(this.attr.attributes.indices){
      gl.drawElements(this.attr.drawMode,this.attr.attributes.indices.count,gl.UNSIGNED_SHORT,0)
    }else{
      gl.drawArrays(this.attr.drawMode)
    }
  }
}