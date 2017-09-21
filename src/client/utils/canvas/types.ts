export type Point = {
  x: number;
  y: number;
}

export type DrawLineGeometry = {
  from: Point;
  to: Point;
};

export type DrawCircleGeometry = {
  r: number;
  x: number;
  y: number;
};

export type DrawRectGeometry = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type DrawStyle = {
  lineWidth?: number;
  strokeStyle?: string;
  fillStyle?: string;
}

export type NumRange = {
  min: number;
  max: number;
}