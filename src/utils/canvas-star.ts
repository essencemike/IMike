import Circle from './canvas-circle';
/**
 *
 * 鼠标点画圈闪烁变动
 *
 * @class CurrentCircle
 * @extends {Circle}
 */
export default class Star extends Circle {
  constructor(x: number, y: number) {
    super(x, y);
  }

  drawCircle(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    // this.r = (this.r < 14 && this.r > 1) ? this.r + ((Math.random() * 2) - 1) : 2;
    this.r = 8;
    ctx.arc(this.x, this.y, this.r, 0, 360);
    ctx.closePath();
    const rgbaColor = [
      Math.floor(Math.random() * 255),
      Math.floor(Math.random() * 255),
      Math.floor(Math.random() * 255),
    ].join(',');
    ctx.fillStyle = `rgba(${rgbaColor}, ${Math.floor(Math.random() * 100) / 100})`;
    ctx.fill();
  }
}
