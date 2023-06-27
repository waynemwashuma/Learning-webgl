import { Matrix } from "/math/Matrix.js"
import { Vector } from "/math/Vector.js"

export class Transform{
  constructor(){
    this.matrix = new Matrix()
    this.position = new Vector(0,0,0)
    this.rotation = new Vector(0,0,0)
    this.scale = new Vector(1,1,1)
  }
  updateMatrix(){
    this.matrix.compose(this.position,this.rotation,this.scale)
  }
}