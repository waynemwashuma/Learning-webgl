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
  }
  init(gl) {
    this.program = createProgramFromSrc(this.vSrc,this.fSrc)
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
}