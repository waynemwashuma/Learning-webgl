import { Geometry } from "./geometry.js"

export class PlaneGeometry extends Geometry {
  constructor(w, h) {
    let indices = [
      0, 1, 2, 0, 3, 2, //bottom face
      ]
    let vertices = [
     0.5, 0.5, 0,
     0.5, -0.5, 0,
     -0.5, -0.5, 0,
     -0.5, 0.5, 0,
     ]
     let uv = [
       1,0,
       1,1,
       0,1,
       0,0
       ]
    super(vertices, indices,null,uv)
  }
}