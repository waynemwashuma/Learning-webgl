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
export function createTexture(gl,img,flipY ) {
  let tex = gl.createTexture()
  
  if(flipY)gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,true)
  gl.bindTexture(gl.TEXTURE_2D,tex)
  gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,img)
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR)
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR_MIPMAP_NEAREST)
  gl.generateMipmap(gl.TEXTURE_2D)
  gl.bindTexture(gl.TEXTURE_2D,null)
  
    if(flipY)gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,false)
  return tex
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
    ${gl.getProgramInfoLog(program)}
    `);
    gl.deleteProgram(program)
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
 * @param {WebGL2RenderingContext} gl
 */
export function createVAO(gl, indices, vertices, normals, uv) {
  let vao = {
    drawMode: gl.TRIANGLES,
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
    dict.count = indices.length

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW)
    //gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null)
  }
  if (vertices != void 0) {
    let dict = vao.attributes.position = {}
    let buffer = gl.createBuffer()
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

/**
 * @param {WebGL2RenderingContext} gl
 */
export function createProgramFromSrc(gl, vshader, fshader) {
  let v = createshader(gl, vshader, gl.VERTEX_SHADER)
  let f = createshader(gl, fshader, gl.FRAGMENT_SHADER)
  if (f == null || v == null) {
    gl.deleteShader(v)
    gl.deleteShader(f)
    return null
  }
  let program = createProgram(gl, v, f)
  return program
}

/**
 * @param {WebGL2RenderingContext} gl
 */
export function getAttrLoc(gl, program, name) {
  return gl.getAttribLocation(program, name)
}

/**
 * @param {WebGL2RenderingContext} gl
 */
export function getUniformLoc(gl, program, name) {
  return gl.getUniformLocation(program, name)
}