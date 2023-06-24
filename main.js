let canvas = document.getElementById("can")

let ctx = canvas.getContext("webgl")

console.log(ctx);

window.onresize = () => {
  canvas.width = innerWidth
  canvas.height = innerHeight
}
canvas.width = innerWidth
canvas.height = innerHeight