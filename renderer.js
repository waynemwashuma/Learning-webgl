export class Renderer {
  constructor(canvas) {
    this.domElement = canvas || document.createElement("canvas")
    /**
     * @type {WebGL2RenderingContext}
     */
    this.gl = canvas.getContext("webgl2")
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0)
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
  clear(){
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT)
  }
  update() {
    this.clear()
    if (this.camera) {
      this.camera.updateMatrix()
    }
    for (var i = 0; i < this.meshes.length; i++) {
      this.meshes[i].update()
      this.meshes[i].renderGL(this.gl, this.camera.view, this.camera.projection)
    }
  }
  setViewport(w, h) {
    let canvas = this.gl.canvas
    canvas.style.width = w + "px"
    canvas.style.height = h + "px"
    canvas.width = w
    canvas.height = h
    this.gl.viewport(0, 0, w, h)
  }
}