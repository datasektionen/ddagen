export function range(start: number, end: number) {
  let list = Array(1 + end - start);
  return [...list].map((_, i) => start + i);
}
