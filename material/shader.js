import {
  createProgramFromSrc
} from "../functions.js"
import {
  UNI_CAM_MAT,
  UNI_PROJ_MAT,
  UNI_MODEL_MAT
} from "../constants.js"

export class Shader {
  /**
   * @param {string} vshaderSrc
   * @param {string} fshaderSrc
   */
  constructor(vshaderSrc, fshaderSrc, uniforms = {}) {
    this.vSrc = vshaderSrc
    this.fSrc = fshaderSrc
    this.program = null
    this.uniforms = uniforms
    this.matuniforms = {}
    this.uniformLoc = {}
    
  }
  /**
   * @param {WebGL2RenderingContext} gl
   */
  init(gl) {

    if (this.program) return
    this.program = createProgramFromSrc(gl, this.vSrc, this.fSrc)
    for (var name in this.uniforms) {
      this.uniformLoc[name] = gl.getUniformLocation(this.program, name)
    }
    Shader.getStandardUniformLoc(gl,this.program,this.uniformLoc)
  }
  /**
   * @param {WebGL2RenderingContext} gl
   */
  activate(gl) {
    gl.useProgram(this.program)
    for (var name in this.uniforms) {
      let u = this.uniforms[name]
      gl["uniform" + u.type]
      (this.uniformLoc[name], u.value)
    }
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
    //attr.drawMode = gl.LINE_LOOP
    if (attr.attributes.indices) {
      gl.drawElements(attr.drawMode, attr.attributes.indices.count, gl.UNSIGNED_SHORT, 0)
    } else {
      gl.drawArrays(attr.drawMode, 0, attr.attributes.position.count)
      console.log();
    }
  }
  /**
   * @param {WebGL2RenderingContext} gl
   */
  static getStandardUniformLoc(gl, program, loc = {}) {
    loc[UNI_CAM_MAT] = gl.getUniformLocation(program,UNI_CAM_MAT )
    loc[UNI_MODEL_MAT] = gl.getUniformLocation(program,UNI_MODEL_MAT )
    loc[UNI_PROJ_MAT] = gl.getUniformLocation(program, UNI_PROJ_MAT)
    return loc
  }
}