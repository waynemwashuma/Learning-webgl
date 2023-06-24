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

let v = createshader(gl,vshader,gl.VERTEX_SHADER)
let f = createshader(gl,fshader,gl.FRAGMENT_SHADER)

let prog = createProgram(gl,v,f)

gl.useProgram(prog)
let id1 = gl.getAttribLocation(prog,"a_position")
let id2 = gl.getUniformLocation(prog,"pointSize")
gl.useProgram(null)

let vertices =new Float32Array([0,0,0])

let buffer = gl.createBuffer()

gl.bindBuffer(gl.ARRAY_BUFFER,buffer)
gl.bufferData(gl.ARRAY_BUFFER,vertices,gl.STATIC_DRAW)
gl.bindBuffer(gl.ARRAY_BUFFER,null)

gl.useProgram(prog)
gl.uniform1f(id2,50.0)

gl.bindBuffer(gl.ARRAY_BUFFER,buffer)
gl.enableVertexAttribArray(id1)
gl.vertexAttribPointer(id1,3,gl.FLOAT,false,0,0)
gl.bindBuffer(gl.ARRAY_BUFFER,null)

gl.drawArrays(gl.POINTS,0,1)









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
  if(!gl.getProgramParameter(program,gl.VALIDATE_STATUS)){
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
