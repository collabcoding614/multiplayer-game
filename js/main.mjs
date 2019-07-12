const socket = io(),
  canvas = document.getElementById("game"),
  ctx = canvas.getContext("2d");

const writeToCanvas = msg => {
  ctx.fillStyle = "white";
  ctx.font = "20px";
  ctx.fillText(msg, 30, 30);
};
socket.on("init", writeToCanvas);
