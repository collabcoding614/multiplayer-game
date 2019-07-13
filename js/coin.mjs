class Coin {
  constructor({ x = 10, y = 10, w = 10, h = 10 }) {
    this.x = x;
    this.y = y;
    this.h = h;
    this.w = w;
    this.xpAdded = 10;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = "yellow";
    ctx.fillRect(this.x, this.y, this.w, this.h);
  }
}

export default Coin;
