import {
  ATTR_POSITION_LOC,
  ATTR_NORMAL_LOC,
  ATTR_UV_LOC,
  ATTR_POSITION_NAME,
  ATTR_NORMAL_NAME,
  ATTR_UV_NAME
} from "./constants.js"

import {
  clear,setViewport,createBuffer,createProgram,createshader,createVAO
} from "./functions.js"


let canvas = document.getElementById("can")
/**
 * @type {WebGL2RenderingContext}
 */
let gl = canvas.getContext("webgl2")
let vshader = `
precision mediump float;

attribute vec3 a_position;
uniform float pointSize;

void main(){
  gl_PointSize = pointSize;
  gl_Position = vec4(a_position,1.0);
}

`
let fshader = `
precision mediump float;

void main(){
  gl_FragColor = vec4(1.0,1.0,0.0,1.0);
}
`

gl.clearColor(0.0, 0.0, 0.0, 1.0)
setViewport(gl, 300, 300)
clear(gl)

let v = createshader(gl, vshader, gl.VERTEX_SHADER)
let f = createshader(gl, fshader, gl.FRAGMENT_SHADER)

let prog = createProgram(gl, v, f)

gl.useProgram(prog)
let id1 = gl.getAttribLocation(prog, "a_position")
let id2 = gl.getUniformLocation(prog, "pointSize")
gl.useProgram(null)

let vertices = new Float32Array([0, 0, 0])

let buffer = gl.createBuffer()

gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)
gl.bindBuffer(gl.ARRAY_BUFFER, null)

gl.useProgram(prog)

gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
gl.enableVertexAttribArray(id1)
gl.vertexAttribPointer(id1, 3, gl.FLOAT, false, 0, 0)
gl.bindBuffer(gl.ARRAY_BUFFER, null)

let size = 50
render()



function render(dt) {
  clear(gl)
  size -= 0.2
  gl.uniform1f(id2, size)
  gl.drawArrays(gl.POINTS, 0, 1)
  requestAnimationFrame(render)
}


