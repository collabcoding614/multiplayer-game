import Player from "./player.mjs";
import controls from "./controls.mjs";
import Coin from "./coin.mjs";

const socket = io(),
  canvas = document.getElementById("game"),
  ctx = canvas.getContext("2d");

let players = [],
  items = [],
  endGame;
socket.on("init", ({ id, plyrs, coins }) => {
  const player = new Player({ id, main: true });
  socket.emit("new-player", player);

  players = plyrs.map(v => new Player(v)).concat(player);

  items = coins.map(v => new Coin(v));

  socket.on("new-player", obj => players.push(new Player(obj)));
  socket.on("move-player", ({ id, dir }) =>
    players.find(v => v.id === id).move(dir)
  );
  socket.on("stop-player", ({ id, dir }) =>
    players.find(v => v.id === id).stop(dir)
  );

  socket.on("end-game", result => {
    endGame = result;
  });

  socket.on(
    "remove-player",
    id => (players = players.filter(v => v.id !== id))
  );

  socket.on("destroy-item", id => (items = items.filter(v => v.id !== id)));

  controls(player, socket);
  const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    players.forEach(v => v.draw(ctx, items));
    items.forEach(v => {
      v.draw(ctx);
      if (v.destroyed) {
        socket.emit("destroy-item", v.id);
      }
    });

    if (endGame) {
      ctx.fillStyle = endGame === "lose" ? "red" : "green";
      ctx.font = "100px ariel";
      ctx.fillText(`You ${endGame}!`, 100, 100);
    }

    items = items.filter(v => !v.destroyed);

    !endGame && requestAnimationFrame(draw);
  };

  draw();
});
