const ATTR_POSITION_NAME = "a_position"
const ATTR_NORMAL_NAME = "a_normal"
const ATTR_UV_NAME = "a_uv"
let ATTR_POSITION_LOC = 0
let ATTR_NORMAL_LOC = 1
let ATTR_UV_LOC = 2



let canvas = document.getElementById("can")
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
/**
 * @type {WebGLRenderingContext}
 */
let gl = canvas.getContext("webgl")

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






function render(dt){
  clear(gl)
  size -= 0.2
  gl.uniform1f(id2,size)
  gl.drawArrays(gl.POINTS, 0, 1)
  requestAnimationFrame(render)
}


/**
 * @param {WebGLRenderingContext} gl
 */
function clear(gl) {
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
}
/**
 * @param {WebGLRenderingContext} gl
 */
function createshader(gl, src, type) {
  let shader = gl.createShader(type)
  gl.shaderSource(shader, src)
  gl.compileShader(shader)

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.log(`Shader could not compile: 
    ${src}
    ========================================
    ${gl.getShaderInfoLog(shader)}
    `);
    gl.deleteShader(shader)
    return null
  }
  return shader
}

/**
 * @param {WebGLRenderingContext} gl
 */
function createProgram(gl, vshader, fshader) {
  let program = gl.createProgram()
  gl.attachShader(program, vshader)
  gl.attachShader(program, fshader)
  gl.bindAttribLocation(program, ATTR_POSITION_LOC, ATTR_POSITION_NAME)
  gl.bindAttribLocation(program, ATTR_NORMAL_LOC, ATTR_NORMAL_NAME)
  gl.bindAttribLocation(program, ATTR_UV_LOC, ATTR_UV_NAME)
  gl.linkProgram(program)
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.log(`Program could not be linked: 
    ========================================
    ${gl.getProgramInfoLog(shader)}
    `);
    gl.deleteProgram(shader)
    return null
  }
  gl.validateProgram(program)
  if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
    console.log(`Program could not be validated: 
    ========================================
    ${gl.getProgramInfoLog(shader)}
    `);
    gl.deleteProgram(shader)
    return null
  }

  gl.detachShader(program, vshader)
  gl.detachShader(program, fshader)
  gl.deleteShader(vshader)
  gl.deleteShader(fshader)
  return program
}
/**
 * @param {WebGLRenderingContext} gl
 */
function setViewport(gl, w, h) {
  canvas.style.width = w + "px"
  canvas.style.height = h + "px"
  canvas.width = w
  canvas.height = h
  gl.viewport(0, 0, w, h)
}

/**
 * @param {WebGLRenderingContext} gl
 */
function createBuffer(gl, typedarray,isstatic = true) {
  let buffer = gl.createBuffer()

  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.bufferData(gl.ARRAY_BUFFER, typedarray,
  isstatic?gl.STATIC_DRAW:gl.DYNAMIC_DRAW)
  gl.bindBuffer(gl.ARRAY_BUFFER, null)
  return buffer
}
/**
 * @param {WebGLRenderingContext} gl
 */
function createVAO(gl, indices, vertices, normals, uv) {
  let vao = {
    drawMode: gl.POINTS,
    attributes: {

    }
  }
  if (indices != void 0) {
    let dict = vao.attributes.element = {}
    let buffer = createBuffer(gl,new Uint16Array(indices))
    dict.buffer = buffer
    dict.size = 1;
    dict.count = indices.length
  }
  if (vertices != void 0) {
    let dict = vao.attributes.position = {}
    let buffer = createBuffer(gl,new Float32Array(vertices))
    dict.buffer = buffer
    dict.size = 3;
    dict.count = vertices.length / dict.size
  }
  if (normals != void 0) {
    let dict = vao.attributes.normals = {}
    let buffer = createBuffer(gl,new Float32Array(normals))
    dict.buffer = buffer
    dict.size = 3;
    dict.count = normals.length / dict.size
  }
  if (uv != void 0) {
    let dict = vao.attributes.uv = {}
    let buffer = createBuffer(gl,new Float32Array(uv))
    dict.buffer = buffer
    dict.size = 2;
    dict.count = vertices.length / dict.size
  }
}