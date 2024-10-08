export function progressScale(progress: number) {
  return Math.atan(-1 * progress ** 2) * 0.5 + 2;
}

export function progressNavScale(progress: number) {
  return Math.atan(-0.1 * progress ** 2) * 10 + 20;
}
export function progressGrayScale(progress: number) {
  return Math.atan(2 * progress ** 2) * 0.6;
}

export const progressPosition = (progress: number, multiplier: number) => {
  return Math.atan(progress) * multiplier + progress * 0.5;
};
