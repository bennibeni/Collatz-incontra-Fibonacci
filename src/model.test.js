import test from "node:test";
import assert from "node:assert/strict";
import {
  nextCollatz,
  parseStart,
  fibonacciIndices,
  wordCounts,
} from "./model.js";
test("orbita standard di 34 e precisione intera", () => {
  let n = 34n;
  const orbit = [n];
  while (n !== 1n) {
    n = nextCollatz(n);
    orbit.push(n);
  }
  assert.deepEqual(orbit, [
    34n,
    17n,
    52n,
    26n,
    13n,
    40n,
    20n,
    10n,
    5n,
    16n,
    8n,
    4n,
    2n,
    1n,
  ]);
  assert.equal(nextCollatz(9007199254740993n), 27021597764222980n);
});
test("conteggi confrontati con enumerazione delle parole senza DD", () => {
  for (let k = 0; k <= 10; k++) {
    let total = 0n,
      p = 0n,
      d = 0n;
    for (let mask = 0; mask < 2 ** k; mask++) {
      const word = k ? mask.toString(2).padStart(k, "0") : "";
      if (word.includes("11")) continue;
      total++;
      if (word.endsWith("0")) p++;
      if (word.endsWith("1")) d++;
    }
    assert.deepEqual(
      { ...wordCounts(k), previous: undefined },
      { p, d, total, previous: undefined },
    );
  }
});
test("appartenenza Fibonacci e validazione", () => {
  assert.deepEqual(fibonacciIndices(1n), [1, 2]);
  assert.deepEqual(fibonacciIndices(34n), [9]);
  assert.deepEqual(fibonacciIndices(89n), [11]);
  assert.deepEqual(fibonacciIndices(27n), []);
  assert.equal(parseStart(" 34 "), 34n);
  for (const bad of ["0", "-1", "1.5", "1e3", "abc", ""])
    assert.throws(() => parseStart(bad));
});
