export const LIMIT = 2000;
export const parity = (n) => (n % 2n === 0n ? "P" : "D");
export const nextCollatz = (n) => (n % 2n === 0n ? n / 2n : 3n * n + 1n);
export function parseStart(text) {
  if (!/^[0-9]{1,100}$/.test(text.trim()) || BigInt(text.trim()) < 1n)
    throw new Error("Inserisci un intero positivo di massimo 100 cifre.");
  return BigInt(text.trim());
}
export function fibonacciIndices(n) {
  const result = [];
  let a = 0n,
    b = 1n,
    i = 0;
  while (a <= n) {
    if (a === n) result.push(i);
    [a, b] = [b, a + b];
    i++;
  }
  return result;
}
// Parole di k simboli senza DD: P_k=P_(k-1)+D_(k-1), D_k=P_(k-1).
export function wordCounts(k) {
  if (k === 0) return { p: 0n, d: 0n, total: 1n, previous: 0n };
  let p = 1n,
    d = 1n,
    previous = 1n;
  for (let i = 1; i < k; i++) {
    previous = p + d;
    [p, d] = [p + d, p];
  }
  return { p, d, total: p + d, previous };
}
export function logValue(n) {
  const s = n.toString();
  return Math.log10(Number(s.slice(0, 15))) + Math.max(0, s.length - 15);
}
