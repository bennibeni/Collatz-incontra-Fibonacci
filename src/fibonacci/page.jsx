import React from "react";
import Link from "../Link.jsx";
import styles from "./page.module.css";

export const metadata = {
  title: "Collatz e Fibonacci: dal grafo alla matrice",
};

function Matrix({ a, b, c, d }) {
  return (
    <span
      className={styles.matrix}
      role="img"
      aria-label={`Matrice: prima riga ${a}, ${b}; seconda riga ${c}, ${d}`}
    >
      <span aria-hidden="true">{a}</span>
      <span aria-hidden="true">{b}</span>
      <span aria-hidden="true">{c}</span>
      <span aria-hidden="true">{d}</span>
    </span>
  );
}

export default function Page() {
  return (
    <article className={styles.article}>
      <Link className={styles.back} href="/R28">
        Torna al laboratorio
      </Link>
      <header>
        <p className={styles.eyebrow}>COLLATZ × FIBONACCI / APPROFONDIMENTO</p>
        <h1>
          Dal grafo delle parità
          <br />
          ai numeri di Fibonacci
        </h1>
        <p>
          Un vincolo semplice — mai due dispari consecutivi — fa nascere un
          conteggio familiare.
        </p>
      </header>
      <section>
        <h2>Due stati, tre passaggi possibili</h2>
        <p>
          Le parità dei numeri di un’orbita di Collatz si possono rappresentare
          con un <strong>grafo a due stati</strong>: Pari (<strong>P</strong>) e
          Dispari (<strong>D</strong>).
        </p>
        <figure className={styles.graph}>
          <svg
            viewBox="0 0 620 310"
            role="img"
            aria-labelledby="parity-graph-title"
            aria-describedby="parity-graph-description"
          >
            <title id="parity-graph-title">Grafo delle parità di Collatz</title>
            <desc id="parity-graph-description">
              Due stati: P, pari, e D, dispari. Tre frecce: P verso P, P verso D
              e D verso P. Nessuna freccia da D a D.
            </desc>
            <defs>
              <marker
                id="parity-graph-arrow"
                viewBox="0 0 10 10"
                refX="9"
                refY="5"
                markerWidth="8"
                markerHeight="8"
                orient="auto"
              >
                <path d="M0 0 L10 5 L0 10 Z" fill="#85dec5" />
              </marker>
            </defs>
            <g
              fill="none"
              stroke="#85dec5"
              strokeWidth="3"
              markerEnd="url(#parity-graph-arrow)"
            >
              <path d="M116 122 C24 16 260 16 186 120" />
              <path d="M214 147 Q310 76 406 147" />
              <path d="M406 201 Q310 275 214 201" />
            </g>
            <circle
              cx="155"
              cy="172"
              r="62"
              fill="#214d47"
              stroke="#85dec5"
              strokeWidth="3"
            />
            <circle
              cx="465"
              cy="172"
              r="62"
              fill="#51452d"
              stroke="#f1c873"
              strokeWidth="3"
            />
            <g
              fill="#e4edea"
              textAnchor="middle"
              fontSize="30"
              fontWeight="700"
            >
              <text x="155" y="173">
                P
              </text>
              <text x="465" y="173">
                D
              </text>
            </g>
            <g fill="#bfd0d3" textAnchor="middle" fontSize="17">
              <text x="155" y="199">
                Pari
              </text>
              <text x="465" y="199">
                Dispari
              </text>
              <text x="155" y="32">
                n / 2 resta pari
              </text>
              <text x="310" y="98">
                n / 2 diventa dispari
              </text>
              <text x="310" y="278">
                3n + 1 è sempre pari
              </text>
            </g>
          </svg>
          <figcaption>
            Due stati e tre frecce. L’arco che torna su P rappresenta P → P. Da
            D si può andare soltanto a P.
          </figcaption>
        </figure>
        <p>Le frecce indicano i passaggi possibili:</p>
        <ul>
          <li>
            <strong>P → P</strong>, come 8 → 4;
          </li>
          <li>
            <strong>P → D</strong>, come 6 → 3;
          </li>
          <li>
            <strong>D → P</strong>, come 3 → 10.
          </li>
        </ul>
        <p>
          Il passaggio <strong>D → D è impossibile</strong>, perché 3n + 1 è
          sempre pari quando n è dispari.
        </p>
        <p>
          Questo grafo descrive le transizioni di parità possibili. Per sapere
          quale freccia seguire quando siamo in P, dobbiamo conoscere il numero.
        </p>
      </section>
      <section>
        <h2>Come compare Fibonacci?</h2>
        <p>
          Contiamo le parole che possiamo scrivere seguendo il grafo, partendo
          da P oppure da D. La lunghezza indica il numero di simboli, incluso
          quello iniziale:
        </p>
        <pre>
          {
            "1 simbolo:  P, D                       → 2 parole\n2 simboli:  PP, PD, DP                  → 3 parole\n3 simboli:  PPP, PPD, PDP, DPP, DPD      → 5 parole\n4 simboli:                             → 8 parole"
          }
        </pre>
        <p>
          Ogni parola valida finisce con <strong>P</strong> oppure con{" "}
          <strong>D</strong>:
        </p>
        <ul>
          <li>
            quelle che finiscono con <strong>P</strong> si ottengono aggiungendo
            P a qualsiasi parola valida più corta di un simbolo;
          </li>
          <li>
            quelle che finiscono con <strong>D</strong> devono terminare con{" "}
            <strong>PD</strong>, quindi si ottengono aggiungendo PD a qualsiasi
            parola valida più corta di due simboli.
          </li>
        </ul>
        <p>Per questo ogni conteggio è la somma dei due precedenti:</p>
        <p className={styles.formula}>2, 3, 5, 8, 13, 21, …</p>
        <p>Sono i numeri di Fibonacci!</p>
        <p className={styles.note}>
          La regola vale da due simboli in poi: si conta una sola parola vuota
          di lunghezza 0. Per una parola di un solo simbolo, le possibilità sono
          P e D.
        </p>
      </section>
      <section>
        <h2>Lo stesso risultato con una matrice</h2>
        <p>
          Scrivendo 1 per ogni freccia presente e 0 per quella assente,
          otteniamo:
        </p>
        <div className={styles.equation}>
          <span>A =</span>
          <Matrix a="1" b="1" c="1" d="0" />
        </div>
        <p>
          Le righe indicano lo stato di partenza, le colonne quello di arrivo,
          nell’ordine P, D.
        </p>
        <p>
          Gli elementi di A<sup>m</sup> contano i cammini di{" "}
          <strong>m frecce</strong>, cioè le parole di{" "}
          <strong>m + 1 simboli</strong>. Sommando tutti gli elementi otteniamo
          il numero totale di parole:
        </p>
        <div className={styles.examples}>
          <div className={styles.equation}>
            <span>A =</span>
            <Matrix a="1" b="1" c="1" d="0" />
            <span>
              → <strong>3</strong> parole di 2 simboli
            </span>
          </div>
          <div className={styles.equation}>
            <span>A² =</span>
            <Matrix a="2" b="1" c="1" d="1" />
            <span>
              → <strong>5</strong> parole di 3 simboli
            </span>
          </div>
          <div className={styles.equation}>
            <span>A³ =</span>
            <Matrix a="3" b="2" c="2" d="1" />
            <span>
              → <strong>8</strong> parole di 4 simboli
            </span>
          </div>
        </div>
        <p>
          Anche nella matrice ricompare dunque Fibonacci. Il suo autovalore
          dominante è il <strong>rapporto aureo</strong>, φ ≈ 1,618: il numero
          di parole cresce, per lunghezze grandi, approssimativamente di questo
          fattore a ogni simbolo aggiunto.
        </p>
      </section>
      <aside className={styles.note}>
        Questo collegamento riguarda il{" "}
        <strong>conteggio delle parole di parità</strong> e, da solo, non
        dimostra che tutte le orbite di Collatz raggiungano 1.
      </aside>
      <Link className={styles.back} href="/R28">
        Esplora il grafo nel laboratorio
      </Link>
      <p>
        <Link className={styles.back} href="/rxx/R28/entropia">
          Prosegui: l’entropia topologica del grafo
        </Link>
      </p>
    </article>
  );
}
