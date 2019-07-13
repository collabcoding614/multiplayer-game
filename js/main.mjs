import Player from "./player.mjs";
import controls from "./controls.mjs";

const socket = io(),
  canvas = document.getElementById("game"),
  ctx = canvas.getContext("2d");

const writeToCanvas = msg => {
  ctx.fillStyle = "white";
  ctx.font = "20px";
  ctx.fillText(msg, 30, 30);
};

let players = [];
socket.on("init", ({ id, plyrs }) => {
  const player = new Player({ id });
  socket.emit("new-player", player);
  players = plyrs.map(v => new Player(v)).concat(player);
  socket.on("new-player", obj => {
    players.push(new Player(obj));
    console.log(players);
  });
  socket.on("move-player", ({ id, dir }) => {
    console.log(id, dir, players);
    players.find(v => v.id === id).move(dir);
  });
  socket.on("stop-player", ({ id, dir }) =>
    players.find(v => v.id === id).stop(dir)
  );

  controls(player, socket);
  const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";

    players.forEach(v => v.draw(ctx));

    requestAnimationFrame(draw);
  };

  draw();
});
