import { Matrix } from "/math/Matrix.js"
import { Vector } from "/math/Vector.js"

export class Transform{
  constructor(){
    this.matrix = new Matrix()
    this.position = new Vector()
    this.rotation = new Vector()
    this.scale = new Vector()
  }
  updateMatrix(){
    this.matrix.compose(this.position,this.rotation,this.scale)
  }
}