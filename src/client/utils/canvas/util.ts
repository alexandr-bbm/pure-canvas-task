import { DrawLineGeometry, DrawRectGeometry, DrawStyle, DrawCircleGeometry } from './types';
import { getDevicePixelRatio } from '../pixelRatio';

export class CanvasUtil {
  ctx: CanvasRenderingContext2D;
  canvasEl: HTMLCanvasElement;
  pixelRatio: number;

  constructor(canvasEl: HTMLCanvasElement) {
    this.initContext(canvasEl);
  }

  private initContext(canvasEl: HTMLCanvasElement) {
    this.canvasEl = canvasEl;
    this.ctx = canvasEl.getContext('2d');
    this.pixelRatio = getDevicePixelRatio();

    const { width: browserWidth, height: browserHeight } = canvasEl.getBoundingClientRect();
    const width = browserWidth * this.pixelRatio;
    const height = browserHeight * this.pixelRatio;

    canvasEl.width = width;
    canvasEl.height = height;

    canvasEl.style.width = browserWidth + 'px';
    canvasEl.style.height = browserHeight + 'px';

    const container = canvasEl.parentElement;
    container.style.width = canvasEl.style.width;
    container.style.height = canvasEl.style.height;
  }

  drawLine = ({ from, to }: DrawLineGeometry, lineOptions?: DrawStyle) => {
    this.applyLineOptions(lineOptions);
    this.ctx.beginPath();
    this.ctx.moveTo(from.x, from.y);
    this.ctx.lineTo(to.x, to.y);
    this.ctx.closePath(); // todo ??
    this.ctx.stroke();
  };

  drawRectangle = ({ x, y, width, height }: DrawRectGeometry, lineOptions?: DrawStyle) => {
    this.applyLineOptions(lineOptions);
    this.ctx.beginPath();
    this.ctx.rect(x, y, width, height);
    this.ctx.stroke();
  };

  drawCircle = ({ x, y, r }: DrawCircleGeometry, lineOptions?: DrawStyle) => {
    this.applyLineOptions(lineOptions);
    this.ctx.beginPath();
    this.ctx.arc(x, y, r, 0, 2 * Math.PI, false);
    this.ctx.fill();
  };

  applyLineOptions(lineOptions: DrawStyle) {
    if (lineOptions) {
      Object.keys(lineOptions).forEach(
        key => (this.ctx as any)[key] = (lineOptions as any)[key]
      )
    }
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvasEl.width, this.canvasEl.height);
  }
}
