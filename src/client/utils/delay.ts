export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
export const nextTick = () => delay(0);