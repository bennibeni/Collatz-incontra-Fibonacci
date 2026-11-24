import React, { useEffect, useMemo, useState } from "react";
import {
  LIMIT,
  parity,
  nextCollatz,
  parseStart,
  wordCounts,
  logValue,
} from "./model.js";
import "./CollatzFibonacci.css";
import InfoDialog from "./InfoDialog.jsx";
import Link from "./Link.jsx";

const short = (n) => {
  const s = n.toString();
  return s.length > 22 ? `${s.slice(0, 12)}…${s.slice(-6)}` : s;
};
function Automaton({ state, edge }) {
  return (
    <svg
      className="automaton"
      viewBox="0 0 620 270"
      role="img"
      aria-label={`Automa delle parità. Stato attuale ${state === "P" ? "pari" : "dispari"}. ${edge ? `Ultima transizione ${edge}.` : ""}`}
    >
      <defs>
        <marker
          id="cf-arrow"
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="7"
          markerHeight="7"
          orient="auto-start-reverse"
        >
          <path d="M0 0 10 5 0 10z" fill="context-stroke" />
        </marker>
      </defs>
      <g fill="none" markerEnd="url(#cf-arrow)">
        <path
          className={edge === "PP" ? "edge selected" : "edge"}
          d="M125 100 C30 -10 250 -10 185 100"
        />
        <path
          className={edge === "PD" ? "edge selected" : "edge"}
          d="M215 129 Q310 62 405 129"
        />
        <path
          className={edge === "DP" ? "edge selected" : "edge"}
          d="M405 181 Q310 247 215 181"
        />
      </g>
      <text x="155" y="29" textAnchor="middle">
        n / 2 → pari
      </text>
      <text x="310" y="83" textAnchor="middle">
        n / 2 → dispari
      </text>
      <text x="310" y="247" textAnchor="middle">
        3n + 1 → sempre pari
      </text>
      <circle
        className={`state even ${state === "P" ? "active" : ""}`}
        cx="155"
        cy="153"
        r="62"
      />
      <circle
        className={`state odd ${state === "D" ? "active" : ""}`}
        cx="465"
        cy="153"
        r="62"
      />
      <text className="state-title" x="155" y="151" textAnchor="middle">
        PARI
      </text>
      <text x="155" y="176" textAnchor="middle">
        P
      </text>
      <text className="state-title" x="465" y="151" textAnchor="middle">
        DISPARI
      </text>
      <text x="465" y="176" textAnchor="middle">
        D
      </text>
    </svg>
  );
}
function admittedWords(length, limit = 144) {
  const words = [];
  const stack = [""];
  while (stack.length && words.length < limit) {
    const word = stack.pop();
    if (word.length === length) {
      words.push(word);
      continue;
    }
    if (!word.endsWith("D")) stack.push(word + "D");
    stack.push(word + "P");
  }
  return words;
}
export default function CollatzFibonacci({ initialValue = "34" }) {
  const [input, setInput] = useState(String(initialValue));
  const [history, setHistory] = useState(() => [
    parseStart(String(initialValue)),
  ]);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(700);
  const [error, setError] = useState("");
  const n = history.at(-1),
    step = history.length - 1,
    done = n === 1n,
    limited = step >= LIMIT;
  const state = parity(n),
    previous = history.at(-2),
    edge = previous === undefined ? null : parity(previous) + state;
  const counts = useMemo(() => wordCounts(history.length), [history.length]);
  const words = useMemo(() => admittedWords(history.length), [history.length]);
  const max = history.reduce((a, b) => (a > b ? a : b), 0n);
  const heights = history.map(logValue),
    ceiling = Math.max(1, ...heights);
  const points = heights
    .map(
      (y, i) =>
        `${25 + (i / Math.max(1, step)) * 710},${170 - (y / ceiling) * 140}`,
    )
    .join(" ");
  function advance() {
    setHistory((h) =>
      h.at(-1) === 1n || h.length > LIMIT ? h : [...h, nextCollatz(h.at(-1))],
    );
  }
  function restart(value = input) {
    try {
      const start = parseStart(String(value));
      setHistory([start]);
      setInput(String(value));
      setPlaying(false);
      setError("");
    } catch (e) {
      setError(e.message);
    }
  }
  useEffect(() => {
    if (!playing || done || limited) return;
    const timer = setInterval(advance, speed);
    return () => clearInterval(timer);
  }, [playing, speed, done, limited]);
  useEffect(() => {
    if (done || limited) setPlaying(false);
  }, [done, limited]);
  useEffect(() => {
    const pause = () => setPlaying(false);
    window.addEventListener("hashchange", pause);
    return () => window.removeEventListener("hashchange", pause);
  }, []);
  return (
    <main className="cf-lab">
      <header>
        <div className="eyebrow">LABORATORIO · TEORIA DEI NUMERI</div>
        <h1>
          Una traiettoria.
          <br />
          <span>Due modi di leggerla.</span>
        </h1>
        <p>
          Dai numeri alla parità: scopri perché contare i percorsi di Collatz fa
          comparire Fibonacci.
        </p>
      </header>
      <div className="learning-path" aria-label="Percorso di lettura">
        <span>Orbita</span>
        <span>Parola P/D</span>
        <span>Automa</span>
        <span>Fibonacci</span>
      </div>
      <p className="intro-note">
        Un’<strong>orbita</strong> è la sequenza dei valori ottenuti ripetendo
        Collatz. Qui osserviamo prima i numeri, poi conserviamo soltanto la loro
        parità: <strong>P</strong> per pari, <strong>D</strong> per dispari.
      </p>
      <section className="toolbar" aria-label="Controlli della simulazione">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            restart();
          }}
        >
          <label htmlFor="cf-start">Numero iniziale</label>
          <div className="input-row">
            <input
              id="cf-start"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              inputMode="numeric"
            />
            <button type="submit">Carica</button>
          </div>
        </form>
        <div className="presets">
          <span>Esplora</span>
          {["21", "34", "89", "27"].map((x) => (
            <button key={x} onClick={() => restart(x)}>
              {x}
            </button>
          ))}
          <button
            type="button"
            title="Carica un intero casuale tra 1 e 1.000"
            onClick={() =>
              restart(String(1 + Math.floor(Math.random() * 1000)))
            }
          >
            Casuale
          </button>
        </div>
        <label className="speed">
          Ritmo
          <select
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
          >
            <option value="1400">Lento</option>
            <option value="700">Medio</option>
            <option value="200">Veloce</option>
          </select>
        </label>
      </section>
      <div className="transport">
        <button
          disabled={step === 0}
          onClick={() => {
            setPlaying(false);
            setHistory((h) => h.slice(0, -1));
          }}
        >
          Indietro
        </button>
        <button
          className="primary"
          disabled={done || limited}
          onClick={() => setPlaying((p) => !p)}
        >
          {playing ? "Pausa" : "▶ Avvia"}
        </button>
        <button
          disabled={done || limited}
          onClick={() => {
            setPlaying(false);
            advance();
          }}
        >
          Passo
        </button>
        <button onClick={() => restart(history[0].toString())}>
          Ricomincia
        </button>
      </div>
      {error && (
        <p role="alert" className="error">
          {error}
        </p>
      )}
      <section className="panel orbit-panel">
        <div className="panel-heading">
          <div className="cf-title-with-info">
            <h2>01 / L’orbita e la sua parola</h2>
            <InfoDialog topic="orbit" />
          </div>
          <span className="muted">
            {history.length} valori · {step} transizioni · massimo {short(max)}
          </span>
        </div>
        <svg
          className="chart"
          viewBox="0 0 760 200"
          role="img"
          aria-label={`Andamento dell'orbita in scala logaritmica, ${step} passi, massimo ${max}`}
        >
          <path d="M25 25V170H735" stroke="#344453" fill="none" />
          <polyline
            points={points}
            fill="none"
            stroke="#74dcc2"
            strokeWidth="2.5"
          />
          {history.map((value, i) => {
            return (
              <circle
                key={i}
                cx={25 + (i / Math.max(1, step)) * 710}
                cy={170 - (heights[i] / ceiling) * 140}
                r={i === step ? 5 : 2.5}
                fill="#74dcc2"
              >
                <title>{`Passo ${i}: ${value.toString()}`}</title>
              </circle>
            );
          })}
          <text x="25" y="192">
            passo 0
          </text>
          <text x="735" y="192" textAnchor="end">
            passo {step}
          </text>
        </svg>
        <p className="legend">
          Altezza = log₁₀(n). Ogni punto rappresenta un valore.
        </p>
        <div className="parity-word">
          <span>La parola dell’orbita: un simbolo per ogni valore</span>
          <code>{history.map(parity).join("")}</code>
          <small>
            {history.length} simboli, {step} transizioni. P = pari · D =
            dispari.
          </small>
        </div>
        <div className="trace" aria-label="Valori e parità dell’orbita">
          {history.map((value, i) => (
            <button
              key={i}
              className={`trace-item ${parity(value) === "P" ? "even" : "odd"} ${i === step ? "chosen" : ""}`}
              title={`Passo ${i}: ${value}`}
              onClick={() => {
                setPlaying(false);
                setHistory((h) => h.slice(0, i + 1));
              }}
            >
              <small>
                {i} / {parity(value)}
              </small>
              {short(value)}
            </button>
          ))}
        </div>
      </section>
      <div className="workspace">
        <section className="panel machine">
          <div className="panel-heading">
            <div className="cf-title-with-info">
              <h2>02 / L’automa delle parità</h2>
              <InfoDialog topic="automaton" />
            </div>
            <span className={`pill ${state === "P" ? "even" : "odd"}`}>
              {state === "P" ? "Stato pari" : "Stato dispari"}
            </span>
          </div>
          <Automaton state={state} edge={edge} />
          <div className="current">
            <span>VALORE AL PASSO {step}</span>
            <strong title={n.toString()}>{short(n)}</strong>
          </div>
          <p className="equation" aria-live="polite">
            {previous === undefined
              ? "Scegli il primo passo per osservare la transizione."
              : `${short(previous)} ${parity(previous) === "P" ? "÷ 2" : "× 3 + 1"} = ${short(n)} · ${edge[0]} → ${edge[1]}`}
          </p>

          <p className="status" role="status">
            {done
              ? "Raggiunto 1. Il ciclo successivo sarebbe 1 → 4 → 2 → 1."
              : limited
                ? `Pausa al limite di ${LIMIT} passi; la convergenza non è stata determinata.`
                : "Ogni dispari conduce a un pari. Due D consecutivi sono impossibili."}
          </p>
        </section>
        <section className="panel fibonacci">
          <div className="panel-heading">
            <div className="cf-title-with-info">
              <h2>03 / Il ponte con Fibonacci</h2>
              <InfoDialog topic="fibonacci" />
            </div>
            <span className="pill">k = {history.length} simboli</span>
          </div>
          <p>
            La tua orbita ha scritto una parola di{" "}
            <b>{history.length} simboli</b>. Quante parole della stessa
            lunghezza ammette l’automa?
          </p>
          <div className="parity-word">
            <span>La parola della tua orbita (P = pari, D = dispari)</span>
            <code>{history.map(parity).join("")}</code>
            <small>Un simbolo per ogni valore, incluso quello iniziale.</small>
          </div>
          <details className="word-list">
            <summary>
              Quali parole?{" "}
              {counts.total <= 144n ? `Tutte le ${counts.total}` : "Prime 144"}{" "}
              di lunghezza {history.length}
            </summary>
            <p>
              Ogni parola usa P e D senza due D consecutivi. Il conteggio
              comprende entrambe le parità iniziali. La parola attuale è
              evidenziata.
            </p>
            <div className="word-grid">
              {words.map((word) => (
                <code
                  key={word}
                  className={
                    word === history.map(parity).join("") ? "actual-word" : ""
                  }
                >
                  {word}
                </code>
              ))}
            </div>
            {counts.total > 144n && (
              <p>
                Elenco limitato a 144 parole per mantenere leggibile la pagina.
                Il totale sopra è esatto.
              </p>
            )}
          </details>
          <div className="count" title={counts.total.toString()}>
            {short(counts.total)}
            <small>
              = F<sub>{history.length + 2}</sub>
            </small>
          </div>
          <div className="count-grid">
            <div>
              <span>Terminano in P</span>
              <b title={counts.p.toString()}>{short(counts.p)}</b>
            </div>
            <div>
              <span>Terminano in D</span>
              <b title={counts.d.toString()}>{short(counts.d)}</b>
            </div>
          </div>
          <div className="explanation">
            <b>Perché Fibonacci?</b>
            <p>
              Una parola valida finisce con P oppure con PD (con il caso
              iniziale D). Per k ≥ 2: a<sub>k</sub> = a<sub>k−1</sub> + a
              <sub>k−2</sub>, con a₀ = 1 e a₁ = 2.
            </p>
            <p>
              Nel tuo automa: P<sub>k</sub> = P<sub>k−1</sub> + D<sub>k−1</sub>{" "}
              e D<sub>k</sub> = P<sub>k−1</sub>.
            </p>
          </div>
          <p className="note">
            Questo numero conta le parole ammesse dall’automa: non è il valore
            dell’orbita e non dimostra la convergenza di Collatz.
          </p>
          <p>
            <Link
              href="/rxx/R28/fibonacci"
              style={{ color: "#85dec5", textDecoration: "underline" }}
            >
              Approfondisci: dal grafo alla matrice di Fibonacci
            </Link>
          </p>
          <p>
            <Link
              href="/rxx/R28/entropia"
              style={{ color: "#85dec5", textDecoration: "underline" }}
            >
              Approfondisci: l’entropia topologica
            </Link>
          </p>
        </section>
      </div>

      <footer>
        Convenzione: C(n) = n/2 se pari; C(n) = 3n+1 se dispari. Il simbolo
        iniziale è incluso nella parola. Calcoli interi esatti con BigInt.
      </footer>
    </main>
  );
}
