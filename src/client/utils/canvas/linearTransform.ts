import { Point } from './types';

export type LinearTransformOptions = {
  point1: Point;
  point2: Point;
}

export function createLinearTransform({ point1, point2 }: LinearTransformOptions) {
  const { x: x1, y: y1 } = point1;
  const { x: x2, y: y2 } = point2;
  return (x: number) => (x2 * y1 - x1 * y2 - x * (y1 - y2)) / (x2 - x1);
}