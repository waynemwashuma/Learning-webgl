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
import { Mesh } from "./meshes/mesh.js"
import { Shader } from "./material/index.js"
import { BoxGeometry, Geometry } from "./geometry/index.js"
import { Matrix } from "/math/Matrix.js"
import { Vector } from "/math/Vector.js"
import { Camera } from "/camera.js"
import { Renderer } from "./renderer.js"

let canvas = document.getElementById("can")

let renderer = new Renderer(canvas)
let vshader =
  `precision mediump float;

attribute vec3 a_position;
attribute vec3 a_normal;
uniform float pointSize;
uniform mat4 uCamera;
uniform mat4 uProjection;
uniform mat4 uModel;
varying vec3 color;

void main(){
  gl_PointSize = pointSize;
  gl_Position = uProjection * uCamera * uModel * vec4(a_position,1.0);
  color = a_normal;
}

`
let fshader =
  `precision mediump float;
varying vec3 color;


void main(){
  gl_FragColor = vec4(1.0,1.0,0.0,1.0);
}

`
let camera = new Camera()
let m = new Mesh(new BoxGeometry([0, -0.4, 0, 0.4, 0.4, 0, -0.4, 0.4, 0], [0, 1, 2]), new Shader(vshader, fshader, {
  pointSize: {
    value: 50.0,
    type: "1f"
  }
}))

renderer.camera = camera
renderer.add(m)
renderer.setViewport(300, 300)

camera.makePerspective(90)
//camera.updateProjection()
camera.transform.position.z = 3

render()




function render(dt) {
  m.transform.rotation.y += Math.PI / 100
  //camera.transform.rotation.z += Math.PI/100
  renderer.update()
  requestAnimationFrame(render)
}