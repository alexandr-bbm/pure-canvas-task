import { CanvasUtil } from './util';
import { DrawCircleGeometry, DrawLineGeometry, NumRange, Point } from './types';
import { createLinearTransform } from './linearTransform';
import { Colors } from '../../styles/colors';
import { findNearest, roundToMultiple } from '../numbers';

type CanvasPlotOptions = {
  data: Point[],
  canvasEl: HTMLCanvasElement,
  fixedXAxisRange: NumRange;
  defaultYAxisRange: NumRange;
  displayXValue?: (x: number) => string;
  displayYValue?: (y: number) => string;
}

type UpdatePlotOptions = {
  fixedXAxisRange: NumRange;
}

const PLOT_MARGIN_RIGHT = 43;
const PLOT_MARGIN_BOTTOM = 21;

export class Plot {
  data: Point[];
  canvasEl: HTMLCanvasElement;
  fixedXAxisRange: NumRange;
  defaultYAxisRange: NumRange;
  displayXValue: (x: number) => string;
  displayYValue: (x: number) => string;
  fontSize: number;

  canvasUtil: CanvasUtil;
  plotInnerStart: Point;
  plotInnerEnd: Point;

  xTransformFn: (x: number) => number;
  yTransformFn: (y: number) => number;

  yRange: NumRange;
  yDivisionValue: number;

  constructor(options: CanvasPlotOptions) {
    Object.assign(this, options);
    this.init();
    this.drawPlot();
  }

  public update(data: Point[], options?: UpdatePlotOptions) {
    this.data = data;
    if (options && options.fixedXAxisRange) {
      this.fixedXAxisRange = options.fixedXAxisRange;
    }
    this.canvasUtil.clear();
    this.drawPlot();
  }

  private init() {
    this.canvasUtil = new CanvasUtil(this.canvasEl);
    this.setFont();
  }

  private drawPlot() {
    this.drawBorder();
    this.setTransformFns();
    this.drawYAxis();
    this.drawXAxis();
    this.drawBrokenLine();
  }

  private setFont(fontSize: number = 14) {
    this.fontSize = fontSize;
    this.canvasUtil.ctx.font = `${this.wRatio(this.fontSize)}px Helvetica`;
  }

  private setTransformFns() {
    this.xTransformFn = this.getXTransform();
    this.yTransformFn = this.getYTransform();
  }

  private drawBorder() {
    const { drawRectangle } = this.canvasUtil;

    this.plotInnerStart = {
      x: 1,
      y: 1,
    };
    this.plotInnerEnd = {
      x: this.canvasEl.width - this.wRatio(PLOT_MARGIN_RIGHT),
      y: this.canvasEl.height - this.wRatio(PLOT_MARGIN_BOTTOM),
    };

    const rectangleOptions = {
      ...this.plotInnerStart,
      width: this.plotInnerWidth,
      height: this.plotInnerHeight,
    };
    const lineOptions = {
      lineWidth: 1,
      strokeStyle: '#979797',
    };
    drawRectangle(rectangleOptions, lineOptions)
  }

  private drawBrokenLine() {
    this.data.forEach((point, index, arr) => {
      const isLastPoint = index === arr.length - 1;
      if (isLastPoint) { return; }

      const nextPoint = arr[index + 1];
      this.drawLine({
        from: this.transformPoint(point),
        to: this.transformPoint(nextPoint),
      })
    });

    this.data.forEach(point => {
      this.drawPoint(this.transformPoint(point));
    })
  }

  private getXTransform = () => {
    const { min: minX, max: maxX } = this.fixedXAxisRange;

    return createLinearTransform({
      point1: {
        x: minX,
        y: this.plotInnerStart.x,
      },
      point2: {
        x: maxX,
        y: this.plotInnerEnd.x,
      },
    });
  };

  private getYTransform = () => {
    this.yRange = this.getYRange();

    const { min: minY, max: maxY } = this.yRange;

    return createLinearTransform({
      point1: {
        x: minY,
        y: this.plotInnerEnd.y,
      },
      point2: {
        x: maxY,
        y: this.plotInnerStart.y,
      },
    });
  };

  private getYRange(): NumRange {
    const yValues = this.data.map(point => point.y);

    const { max: maxY, min: minY } = yValues.length === 0
      ? this.defaultYAxisRange
      : {
        max: Math.max(...yValues),
        min: Math.min(...yValues),
      };

    this.yDivisionValue = this.getYDivisionValue(minY, maxY);

    // избегаем появления точек на границах графика
    const maxOffset = Number(maxY % this.yDivisionValue === 0);
    const minOffset =
      minY % this.yDivisionValue === 0
      && minY / this.yDivisionValue !== 0 ? -1 : 0;

    return {
      max: (Math.ceil(maxY / this.yDivisionValue) + maxOffset) * this.yDivisionValue,
      min: (Math.floor(minY / this.yDivisionValue) + minOffset) * this.yDivisionValue,
    }
  }

  private drawXAxis() {
    const { min: minX, max: maxX } = this.fixedXAxisRange;
    const DIVISION_COUNT = 10;
    const divisionValue = (maxX - minX) / DIVISION_COUNT;

    const TEXT_MARGIN_TOP = 5;

    const textY =
      this.plotInnerHeight
      + this.wRatio(TEXT_MARGIN_TOP)
      + this.wRatio(this.fontSize);

    for (let x = minX; x <= maxX; x += divisionValue) {
      const displayText = this.displayXValue
        ? this.displayXValue(x)
        : String(x);

      const xPx = this.xTransformFn(x);
      const textX = xPx + this.getXOffsetForXLabels(x, minX, maxX);

      this.canvasUtil.ctx.fillStyle = Colors['base-text'];
      this.canvasUtil.ctx.fillText(displayText, textX, textY);

      this.drawVerticalMeshLine(x, xPx, minX, maxX);
    }
  }

  private drawYAxis() {
    const { min: minY, max: maxY } = this.yRange;

    const TEXT_MARGIN_LEFT = 7;

    const textX = this.plotInnerWidth + this.wRatio(TEXT_MARGIN_LEFT);

    if (maxY >= 100) {
      this.setFont(12);
    } else {
      this.setFont(14);
    }

    for (let y = minY; y <= maxY; y += this.yDivisionValue) {
      const displayText = this.displayYValue
        ? this.displayYValue(y)
        : String(y);

      const yPx = this.yTransformFn(y);
      const textY = yPx + this.getYOffsetForYLabels(y, minY, maxY);

      this.canvasUtil.ctx.fillStyle = Colors['base-text'];
      this.canvasUtil.ctx.fillText(displayText, textX, textY);

      this.drawHorizontalMeshLine(y, yPx, minY, maxY);
    }
  }

  private getYDivisionValue(minY: number, maxY: number) {
    const DESIRED_DIVISION_COUNT = 5;
    const DIVISION_VALUES = [5, 10, 20, 50, 100, 500, 1000];

    const rawDivisionValue = (maxY - minY) / DESIRED_DIVISION_COUNT;

    return findNearest(rawDivisionValue, DIVISION_VALUES);
  }

  private getXOffsetForXLabels(x: number, minX: number, maxX: number) {
    const TEXT_WIDTH = 35;
    switch (x) {
      case minX:
        return 0;

      case maxX:
        return -this.wRatio(TEXT_WIDTH);

      default:
        return -this.wRatio(TEXT_WIDTH / 2);
    }
  }

  private getYOffsetForYLabels(y: number, minY: number, maxY: number) {
    const TEXT_HEIGHT = this.fontSize * 0.7;
    switch (y) {
      case minY:
        return 0;

      case maxY:
        return +this.wRatio(TEXT_HEIGHT);

      default:
        return +this.wRatio(TEXT_HEIGHT / 2);
    }
  }

  private drawVerticalMeshLine(x: number, xPx: number, minX: number, maxX: number) {
    const insidePlotBorder = x !== maxX && x !== minX;

    if (insidePlotBorder) {
      const geometry = {
        from: {
          x: xPx,
          y: this.plotInnerEnd.y,
        },
        to: {
          x: xPx,
          y: this.plotInnerStart.y,
        }
      };

      this.drawMeshLine(geometry)
    }
  }

  private drawHorizontalMeshLine(y: number, yPx: number, minY: number, maxY: number) {
    const insidePlotBorder = y !== maxY && y !== minY;

    if (insidePlotBorder) {
      const geometry = {
        from: {
          x: this.plotInnerStart.x,
          y: yPx,
        },
        to: {
          x: this.plotInnerEnd.x,
          y: yPx,
        }
      };
      this.drawMeshLine(geometry)
    }
  }

  private drawMeshLine(geometry: DrawLineGeometry) {
    const style = {
      strokeStyle: '#D8D8D8'
    };
    this.canvasUtil.drawLine(geometry, style)
  }

  private drawLine(geometry: DrawLineGeometry) {
    const style = {
      lineWidth: this.wRatio(4),
      strokeStyle: Colors['primary'],
    };
    this.canvasUtil.drawLine(geometry, style)
  }

  private drawPoint(centerCoords: { x: number, y: number }) {
    const style = {
      fillStyle: 'black',
    };
    const geometry = {
      ...centerCoords,
      r: this.wRatio(4.5),
    };
    this.canvasUtil.drawCircle(geometry, style)
  }

  get plotInnerWidth() {
    return this.plotInnerEnd.x - this.plotInnerStart.x;
  }

  get plotInnerHeight() {
    return this.plotInnerEnd.y - this.plotInnerStart.y;
  }

  private wRatio(num: number) {
    return num * this.canvasUtil.pixelRatio;
  }

  private transformPoint({ x, y }: Point): Point {
    return {
      x: this.xTransformFn(x),
      y: this.yTransformFn(y),
    }
  }
}