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

io.on("connection", socket => {
  console.log(socket.id);

  socket.emit("init", "Your connected");
});
