import { Geometry } from "./geometry.js"

export class BoxGeometry extends Geometry {
  constructor(w, h) {
    let indices = [
      0, 1, 2, 0, 3, 2, //bottom face
      4, 5, 6, 4, 7, 6, // top face
      3, 4, 7, 0, 4, 3,
      7, 6, 2, 7, 3, 2,
      3, 4, 0, 7, 4, 3,
      0, 4, 1, 4, 5, 1
      ]
    let vertices = [
     0.5, 0.5, -0.5,
     0.5, -0.5, -0.5,
     -0.5, -0.5, -0.5,
     -0.5, 0.5, -0.5,
     0.5, 0.5, 0.5,
     0.5, -0.5, 0.5,
     -0.5, -0.5, 0.5,
     -0.5, 0.5, 0.5,
     ]
    let colors = [
       0, 0, 0,
       1, 0, 0,
       1, 1, 0,
       0, 1, 0,
       0, 1, 1,
       0, 0, 1,
       1, 1, 1
       ]
    super(vertices, indices)
  }
}