/** Округляет до числа, кратного K */
export function roundToMultiple(num: number, K: number, customRoundFn?: (num: number) => number) {
  const roundFn = customRoundFn ? customRoundFn : Math.round;
  return roundFn(num / K) * K;
}

export function findNearest(num: number, allowedNums: number[]) {
  const diffs = allowedNums.map(allowedNum => Math.abs(allowedNum - num));
  const minDiff = Math.min(...diffs);
  const minDiffIdx = diffs.findIndex(diff => diff === minDiff);
  return allowedNums[minDiffIdx];
}