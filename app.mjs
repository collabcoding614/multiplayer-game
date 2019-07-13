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

const players = [];
io.on("connection", socket => {
  console.log(socket.id);

  socket.emit("init", { id: socket.id, plyrs: players });

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
});
