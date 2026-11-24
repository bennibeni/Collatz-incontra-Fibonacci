import React from "react";

import { useState } from "react";
import { wordCounts, logValue } from "../model.js";
import styles from "./page.module.css";

const PHI = (1 + Math.sqrt(5)) / 2;
const number = (value) => value.toFixed(4).replace(".", ",");

export default function EntropyExplorer() {
  const [k, setK] = useState(8);
  const counts = wordCounts(k);
  const rows = [
    {
      name: "Alternanza obbligata",
      example: "PDPD… oppure DPDP…",
      count: 2n,
      estimate: Math.log(2) / k,
      entropy: 0,
      color: "#9eb7ee",
    },
    {
      name: "Vietato DD",
      example: "Il nostro grafo delle parità",
      count: counts.total,
      estimate: (logValue(counts.total) * Math.LN10) / k,
      entropy: Math.log(PHI),
      color: "#85dec5",
    },
    {
      name: "Nessun vincolo",
      example: "Anche DD è ammesso",
      count: 2n ** BigInt(k),
      estimate: Math.LN2,
      entropy: Math.LN2,
      color: "#f1c873",
    },
  ];
  const curve = Array.from({ length: 80 }, (_, i) => {
    const length = i + 1;
    return `${45 + (i / 79) * 620},${210 - ((logValue(wordCounts(length).total) * Math.LN10) / length / 0.75) * 175}`;
  }).join(" ");
  const y = (value) => 210 - (value / 0.75) * 175;
  return (
    <div className={styles.explorer}>
      <label htmlFor="entropy-length">
        Lunghezza della parola: <strong>{k} simboli</strong>
      </label>
      <input
        id="entropy-length"
        type="range"
        min="1"
        max="80"
        value={k}
        onChange={(e) => setK(Number(e.target.value))}
      />
      <p className={styles.hint}>
        Entrambe le parità iniziali sono ammesse. Il cursore cambia il numero di
        simboli, non il numero di frecce.
      </p>
      <div className={styles.cards} aria-live="polite">
        {rows.map((row) => (
          <div
            className={styles.card}
            key={row.name}
            style={{ borderTopColor: row.color }}
          >
            <h3>{row.name}</h3>
            <p>{row.example}</p>
            <span>Parole di {k} simboli</span>
            <strong className={styles.count}>{row.count.toString()}</strong>
            <span>Stima a questa lunghezza: ln(Nₖ) / k</span>
            <b>{number(row.estimate)}</b>
            <span>Entropia: il limite per k → ∞</span>
            <b style={{ color: row.color }}>{number(row.entropy)}</b>
          </div>
        ))}
      </div>
      <figure className={styles.chart}>
        <svg
          viewBox="0 0 720 260"
          role="img"
          aria-labelledby="entropy-curve-title entropy-curve-desc"
        >
          <title id="entropy-curve-title">
            La stima del grafo si avvicina a ln φ
          </title>
          <desc id="entropy-curve-desc">
            Per lunghezze da 1 a 80, ln(F(k+2)) diviso k scende verso 0,4812. La
            linea tratteggiata indica questo limite. Il punto evidenziato
            corrisponde alla lunghezza scelta.
          </desc>
          <path d="M45 25 V210 H665" stroke="#607582" fill="none" />
          <line
            x1="45"
            x2="665"
            y1={y(Math.log(PHI))}
            y2={y(Math.log(PHI))}
            stroke="#f1c873"
            strokeDasharray="6 5"
          />
          <polyline
            points={curve}
            fill="none"
            stroke="#85dec5"
            strokeWidth="3"
          />
          <circle
            cx={45 + ((k - 1) / 79) * 620}
            cy={y(rows[1].estimate)}
            r="6"
            fill="#85dec5"
            stroke="#101a21"
            strokeWidth="2"
          />
          <g fill="#bfd0d3" fontSize="13">
            <text x="45" y="18">
              ln(Nₖ) / k
            </text>
            <text x="5" y="214">
              0
            </text>
            <text x="5" y="48">
              0,7
            </text>
            <text x="45" y="235">
              k = 1
            </text>
            <text x="665" y="235" textAnchor="end">
              k = 80
            </text>
            <text x="665" y={y(Math.log(PHI)) + 20} textAnchor="end">
              limite: ln φ ≈ 0,4812
            </text>
          </g>
        </svg>
        <figcaption>
          La stima a lunghezza finita è distinta dall’entropia: allungando le
          parole, la curva verde si avvicina alla linea del limite.
        </figcaption>
      </figure>
    </div>
  );
}
