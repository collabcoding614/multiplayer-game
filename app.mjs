import express from "express";
import http from "http";
import SocketIO from "socket.io";
import path from "path";

const app = express(),
  server = http.createServer(app),
  io = SocketIO(server),
  __dirname = path.resolve(
    path.dirname(decodeURI(new URL(import.meta.url).pathname))
  );

server.listen(3000, () => console.log("Server listening on port 3000"));
app.use(express.static(__dirname + "/"));

app.get("/", (req, res) => res.sendFile(__dirname + "/index.html"));

import Coin from "./js/coin.mjs";

const players = [];
let coins = [];

for (let i = 0; i < 20; i++)
  coins.push(new Coin({ x: Math.random() * 800, y: Math.random() * 600 }));
io.on("connection", socket => {
  console.log(socket.id);

  socket.emit("init", { id: socket.id, plyrs: players, coins });

  socket.on("new-player", obj => {
    players.push(obj);
    socket.broadcast.emit("new-player", obj);
  });
  socket.on("move-player", dir =>
    socket.broadcast.emit("move-player", { id: socket.id, dir })
  );
  socket.on("stop-player", dir =>
    socket.broadcast.emit("stop-player", { id: socket.id, dir })
  );

  socket.on("destroy-item", id => {
    coins = coins.filter(v => v.id !== id);
    socket.broadcast.emit("destroy-item", id);
  });
});
