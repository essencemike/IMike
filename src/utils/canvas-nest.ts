import Circle from './canvas-circle';
import Star from './canvas-star';

export default class CanvasNest {
  circles: Circle[];
  star: Star;
  w: number;
  h: number;
  ctx: CanvasRenderingContext2D;

  constructor(w: number, h: number, ctx: CanvasRenderingContext2D) {
    this.circles = [];
    this.star = new Star(0, 0);
    this.w = w;
    this.h = h;
    this.ctx = ctx;
  }

  init(n: number): Promise<void> {
    return new Promise((resolve) => {
      for (let i = 0; i < n; i++) {
        this.circles.push(new Circle(Math.random() * this.w, Math.random() * this.h));
      }
      resolve();
    });
  }

  draw() {
    this.ctx.clearRect(0, 0, this.w, this.h);
    for (let i = 0; i < this.circles.length; i++) {
      this.circles[i].move(this.w, this.h);
      this.circles[i].drawCircle(this.ctx);
      for (let j = i + 1; j < this.circles.length; j++) {
        this.circles[i].drawLine(this.ctx, this.circles[j]);
      }
    }

    if (this.star.x) {
      this.star.drawCircle(this.ctx);
      for (let i = 0, len = this.circles.length; i < len; i++) {
        this.star.drawLine(this.ctx, this.circles[i]);
      }
    }
  }
}
