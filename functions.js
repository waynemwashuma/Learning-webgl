import {
  ATTR_POSITION_LOC,
  ATTR_NORMAL_LOC,
  ATTR_UV_LOC,
  ATTR_POSITION_NAME,
  ATTR_NORMAL_NAME,
  ATTR_UV_NAME
} from "./constants.js"

/**
 * @param {WebGLRenderingContext} gl
 */
export function clear(gl) {
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
}
/**
 * @param {WebGLRenderingContext} gl
 */
export function createshader(gl, src, type) {
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
export function createProgram(gl, vshader, fshader) {
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
export function setViewport(gl, w, h) {
  let canvas = gl.canvas
  canvas.style.width = w + "px"
  canvas.style.height = h + "px"
  canvas.width = w
  canvas.height = h
  gl.viewport(0, 0, w, h)
}

/**
 * @param {WebGLRenderingContext} gl
 */
export function createBuffer(gl, typedarray, isstatic = true) {
  let buffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.bufferData(gl.ARRAY_BUFFER, typedarray,
    isstatic ? gl.STATIC_DRAW : gl.DYNAMIC_DRAW)
  gl.bindBuffer(gl.ARRAY_BUFFER, null)
  return buffer
}
/**
 * @param {WebGL2RenderingContext} gl
 */
export function createVAO(gl, indices, vertices, normals, uv) {
  let vao = {
    drawMode: gl.POINTS,
    attributes: {

    }
  }
  vao.vao = gl.createVertexArray()
  gl.bindVertexArray(vao.vao)
  if (indices != void 0) {
    let dict = vao.attributes.indices = {}
    let buffer = gl.createBuffer()
    dict.buffer = buffer
    dict.size = 1
    dict.count = indices.length / 1
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW)
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null)
  }
  if (vertices != void 0) {
    let dict = vao.attributes.position = {}
    let buffer = createBuffer(gl, new Float32Array(vertices), vao.vao, true, false)
    dict.buffer = buffer
    dict.size = 3;
    dict.count = vertices.length / dict.size
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW)
    gl.enableVertexAttribArray(ATTR_POSITION_LOC)
    gl.vertexAttribPointer(ATTR_POSITION_LOC, dict.size, gl.FLOAT, false, 0, 0)
  }
  if (normals != void 0) {
    let dict = vao.attributes.normals = {}
    let buffer = gl.createBuffer()
    dict.buffer = buffer
    dict.size = 3;
    dict.count = normals.length / dict.size
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW)
    gl.enableVertexAttribArray(ATTR_NORMAL_LOC)
    gl.vertexAttribPointer(ATTR_NORMAL_LOC, dict.size, gl.FLOAT, false, 0, 0)
  }
  if (uv != void 0) {
    let dict = vao.attributes.uv = {}
    let buffer = gl.createBuffer()
    dict.buffer = buffer
    dict.size = 2;
    dict.count = vertices.length / dict.size

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(uv), gl.STATIC_DRAW)
    gl.enableVertexAttribArray(ATTR_UV_LOC)
    gl.vertexAttribPointer(ATTR_UV_LOC, dict.size, gl.FLOAT, false, 0, 0)
  }
  gl.bindVertexArray(null)
  gl.bindBuffer(gl.ARRAY_BUFFER, null)
  return vao
}