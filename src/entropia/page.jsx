import React from "react";
import Link from "../Link.jsx";
import EntropyExplorer from "./EntropyExplorer";
import styles from "./page.module.css";

export const metadata = { title: "Entropia topologica del grafo delle parità" };

export default function Page() {
  return (
    <article className={styles.article}>
      <nav aria-label="Approfondimenti Collatz">
        <Link href="/R28">Laboratorio</Link>
        <Link href="/rxx/R28/fibonacci">Grafo e Fibonacci</Link>
      </nav>
      <header>
        <p className={styles.eyebrow}>COLLATZ × FIBONACCI / APPROFONDIMENTO</p>
        <h1>Quante possibilità nascono a ogni passo?</h1>
        <p>
          L’entropia topologica misura quanto rapidamente cresce il numero di
          parole ammesse da un sistema simbolico.
        </p>
      </header>
      <section>
        <h2>Dal conteggio alla crescita</h2>
        <p>
          Nel nostro grafo usiamo P per pari e D per dispari. Il divieto di due
          D consecutivi lascia 2 parole di un simbolo, 3 di due, 5 di tre, poi
          8, 13, 21… Per parole di k simboli il numero esatto è{" "}
          <strong>Nₖ = Fₖ₊₂</strong>.
        </p>
        <p>
          Il conteggio aumenta con la lunghezza. Possiamo però chiederci:{" "}
          <strong>
            con quale fattore cresce, per parole sempre più lunghe?
          </strong>{" "}
          Nel nostro caso il rapporto Nₖ₊₁ / Nₖ tende al rapporto aureo φ ≈
          1,618.
        </p>
        <p>
          L’entropia esprime questa crescita usando il logaritmo. Non misura se
          un singolo valore di Collatz sale o scende: conta la varietà dei
          percorsi simbolici consentiti.
        </p>
      </section>
      <section>
        <h2>Tre regole, tre diverse crescite</h2>
        <p>
          Sposta il cursore e confronta il numero di parole. Con la sola
          alternanza restano sempre due possibilità; vietando DD la crescita
          segue Fibonacci; senza vincoli ogni simbolo raddoppia le possibilità.
        </p>
        <EntropyExplorer />
      </section>
      <section>
        <h2>La formula, un pezzo alla volta</h2>
        <div className={styles.formula}>
          h = lim<sub>k → ∞</sub> ln(Nₖ) / k
        </div>
        <ul>
          <li>
            <strong>Nₖ</strong> è il numero di parole ammesse di k simboli.
          </li>
          <li>
            <strong>ln</strong> è il logaritmo naturale: trasforma una crescita
            esponenziale in una crescita lineare.
          </li>
          <li>
            Dividere per <strong>k</strong> dà una quantità media per simbolo.
          </li>
          <li>
            Il <strong>limite</strong> descrive la crescita per parole sempre
            più lunghe.
          </li>
        </ul>
        <p>
          Per esempio, se Nₖ = 2ᵏ, allora ln(Nₖ) / k = ln 2 per ogni k. Se
          invece Nₖ rimane uguale a 2, il numeratore rimane costante e,
          dividendo per k, il rapporto tende a zero.
        </p>
        <p>
          Per Fibonacci, Fₖ₊₂ cresce come una costante moltiplicata per φᵏ. La
          costante non contribuisce al limite, quindi:
        </p>
        <div className={styles.formula}>h = ln φ ≈ 0,4812</div>
        <p className={styles.note}>
          Qui usiamo logaritmi naturali: l’unità è il nat per simbolo. Con
          logaritmi in base 2, il valore sarebbe log₂ φ ≈ 0,6942 bit per
          simbolo. Cambia l’unità, non il sistema studiato.
        </p>
      </section>
      <section>
        <h2>Il legame con la matrice</h2>
        <p>
          La matrice del grafo è A = ((1, 1), (1, 0)), con righe e colonne
          nell’ordine P, D. Il suo autovalore dominante è φ. Per il sistema
          simbolico definito da questo grafo, l’entropia è il logaritmo di
          quell’autovalore: <strong>h = ln φ</strong>.
        </p>
        <p>
          Questo sistema di sequenze, caratterizzato dal divieto DD, è noto come{" "}
          <i>golden mean shift</i>, cioè il sistema simbolico del rapporto
          aureo. Il termine “shift” indica l’operazione che sposta la lettura di
          una posizione lungo una sequenza.
        </p>
        <Link href="/rxx/R28/fibonacci">Rivedi il grafo e la sua matrice</Link>
      </section>
      <section>
        <h2>Che cosa ci dice su Collatz?</h2>
        <p>
          Descrive la complessità del{" "}
          <strong>sistema simbolico delle sequenze ammesse dal grafo</strong>.
          Il grafo consente di continuare indefinitamente qualsiasi percorso che
          rispetti le sue frecce.
        </p>
        <p>
          Un’orbita numerica concreta è determinata dal numero iniziale: non
          sceglie casualmente la freccia successiva. Inoltre la simulazione del
          laboratorio si ferma a 1 o al limite di passi, mentre qui contiamo
          parole di lunghezza arbitraria del modello simbolico.
        </p>
        <aside className={styles.note}>
          L’entropia positiva di questo modello non dimostra né che la dinamica
          numerica di Collatz sia caotica né che tutte le sue orbite raggiungano
          1. Non stiamo calcolando l’entropia di una singola orbita o la
          frequenza empirica di P e D.
        </aside>
      </section>
      <section>
        <h2>Per approfondire</h2>
        <p>
          <a
            href="https://www-igm.univ-mlv.fr/~perrin/Enseignement/Master2014-15/Lecture1/lecture1.pdf"
            target="_blank"
            rel="noreferrer"
          >
            Dominique Perrin, Words and Automata — Lecture 1
          </a>
          : entropia dei sistemi simbolici descritti da automi e relazione con
          l’autovalore dominante della matrice di adiacenza.
        </p>
      </section>
      <Link href="/R28">Torna al laboratorio</Link>
    </article>
  );
}
