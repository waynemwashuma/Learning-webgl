import {
  createProgramFromSrc
} from "./functions.js"
import { ATTR_POSITION_NAME,ATTR_NORMAL_NAME } from "./constants.js"

export class Shader {
  /**
   * @param {string} vshaderSrc
   * @param {string} fshaderSrc
   */
  constructor(vshaderSrc, fshaderSrc,uniforms = {}) {
    this.vSrc = vshaderSrc
    this.fSrc = fshaderSrc
    this.program = null
    this.uniforms = uniforms 
  }
  /**
   * @param {WebGL2RenderingContext} gl
   */
  init(gl) {
    this.program = createProgramFromSrc(gl, this.vSrc, this.fSrc)
    for (var name in this.uniforms) {
      this.uniforms[name].location = gl.getUniformLocation(this.program, name)
    }
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
  setUniform(name, value) {
    this.uniforms[name].value = value
  }
  preRender() {

  }
  /**
   * @param {WebGL2RenderingContext} gl
   */
  renderGL(gl, attr) {
    attr.drawMode = gl.LINE_LOOP
    if (attr.attributes.indices) {
      gl.drawElements(attr.drawMode, attr.attributes.indices.count, gl.UNSIGNED_SHORT, 0)
    } else {
      gl.drawArrays(attr.drawMode, 0, attr.attributes.position.count)
      console.log();
    }
  }
}