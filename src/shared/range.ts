export function range(start: number, end: number) {
  return [...Array(1 + end - start).keys()].map((v) => start + v);
}
