/**
 * 创建圆圈对象
 * 设置随机的x，y坐标，r半径，mx, my移动距离
 * @class Circle
 */
export default class Circle {
  x: number;
  y: number;
  r: number;
  mx: number;
  my: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.r = (Math.random() * 20) + 3;
    this.mx = Math.random();
    this.my = Math.random();
  }

  /**
   * canvas 画圈
   * @param {any} ctx
   * @memberof Circle
   */
  drawCircle(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 360);
    ctx.closePath();
    ctx.fillStyle = 'rgba(204, 204, 204, .3)';
    ctx.fill();
  }

  drawLine(ctx: CanvasRenderingContext2D, circle: Circle) {
    const dx = this.x - circle.x;
    const dy = this.y - circle.y;
    const d = Math.sqrt((dx * dx) + (dy * dy));
    if (d < 150) {
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(circle.x, circle.y);
      ctx.closePath();
      ctx.strokeStyle = 'rgba(204, 204, 204, .3)';
      ctx.stroke();
    }
  }

  /**
   * 圆圈移动
   * 圆圈移动的距离必须是在屏幕范围内
   * @param {any} w
   * @param {any} h
   * @memberof Circle
   */
  move(w: number, h: number) {
    this.mx = (this.x < w && this.x > 0) ? this.mx : -this.mx;
    this.my = (this.y < h && this.y > 0) ? this.my : -this.my;

    this.x += this.mx / 2;
    this.y += this.my / 2;
  }
}
