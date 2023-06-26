import {
  ATTR_POSITION_LOC,
  ATTR_NORMAL_LOC,
  ATTR_UV_LOC,
  ATTR_POSITION_NAME,
  ATTR_NORMAL_NAME,
  ATTR_UV_NAME
} from "./constants.js"

import {
  clear,
  setViewport,
  createBuffer,
  createProgram,
  createshader,
  createVAO
} from "./functions.js"
import { Mesh } from "./mesh.js"
import { Shader } from "./shader.js"
import { Geometry } from "./geometry.js"
import { Matrix } from "/math/Matrix.js"
import { Vector } from "/math/Vector.js"

let canvas = document.getElementById("can")
/**
 * @type {WebGL2RenderingContext}
 */
let gl = canvas.getContext("webgl2")
let vshader =
  `precision mediump float;

attribute vec3 a_position;
uniform float pointSize;
uniform mat4 uCamera;
uniform mat4 uProjection;
uniform mat4 uModel;

void main(){
  gl_PointSize = pointSize;
  gl_Position = uProjection * uCamera * uModel * vec4(a_position,1.0);
}

`
let fshader =
  `precision mediump float;

void main(){
  gl_FragColor = vec4(1.0,1.0,0.0,1.0);
}
`

let cameraMatrix = new Matrix()
let projectionMatrix = new Matrix()

gl.clearColor(0.0, 0.0, 0.0, 1.0)
setViewport(gl, 300, 300)

let m = new Mesh(new Geometry([0, -0.4, 0, 0.4, 0.4, 0, -0.4, 0.4, 0]), new Shader(vshader, fshader, {
  pointSize: {
    value: 50.0,
    type: "1f"
  }
}))
m.init(gl)
render()






function render(dt) {
  clear(gl)
  m.renderGL(gl,cameraMatrix,projectionMatrix)
  requestAnimationFrame(render)
}