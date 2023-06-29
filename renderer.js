

export class Renderer {
  constructor(canvas) {
    this.domElement = canvas
    /**
     * @type {WebGL2RenderingContext}
     */
    this.gl = canvas.getContext("webgl2")
    this.camera = null
    this.meshes = []
  }
  add(mesh) {
    mesh.init(this.gl)
    this.meshes.push(mesh)
  }
  remove(mesh) {
    let id = this.meshes.indexOf(mesh)
    this.meshes.splice(id, 1)
  }
  update() {
    if(this.camera){
      this.camera.updateMatrix()
    }
    for (var i = 0; i < this.meshes.length; i++) {
      this.meshes[i].update()
      this.meshes[i].renderGL(this.gl,this.camera.view,this.camera.projection)
    }
  }
}