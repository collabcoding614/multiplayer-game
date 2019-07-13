class Player {
  constructor({ id, x = 10, y = 10, w = 50, h = 50, color = "white" }) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.speed = 10;
    this.id = id;
    this.color = color;
    this.isMoving = {};
  }

  draw(ctx) {
    if (this.isMoving.right) this.x += this.speed;
    if (this.isMoving.left) this.x -= this.speed;
    if (this.isMoving.up) this.y -= this.speed;
    if (this.isMoving.down) this.y += this.speed;
    ctx.beginPath();
    ctx.fillstyle = this.color;
    ctx.fillRect(this.x, this.y, this.w, this.h);
  }
  move(dir) {
    this.isMoving[dir] = true;
  }
  stop(dir) {
    this.isMoving[dir] = false;
  }
}

export default Player;
