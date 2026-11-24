import React from "react";
import Link from "./Link.jsx";
import styles from "./fibonacci/page.module.css";

export default function Permutations() {
  return (
    <article className={styles.article}>
      <Link className={styles.back} href="/R28">
        Torna al laboratorio
      </Link>
      <header>
        <p className={styles.eyebrow}>LETTURA SUCCESSIVA</p>
        <h1>Fibonacci e le permutazioni di Collatz</h1>
        <p>
          L’<a href="https://permutatriangle.github.io/assets/talks/collatz/PPposter.pdf" target="_blank" rel="noopener noreferrer">articolo</a> studia un oggetto diverso dalle parole P/D: l’ordine
          relativo dei valori visitati.
        </p>
      </header>
      <section>
        <h2>Da una sequenza a una permutazione</h2>
        <p>
          Osserviamo l’orbita che parte da 12. Fermiamo la traccia prima della
          prima potenza di 2:
        </p>
        <pre>{"12 → 6 → 3 → 10 → 5   (poi arriva 16)"}</pre>
        <p>
          Ordiniamo questi valori dal più piccolo al più grande: 3, 5, 6, 10,
          12. Sostituiamo ogni valore con la sua posizione in questo
          ordinamento:
        </p>
        <pre>
          {
            "Valore:       12  6  3  10  5\nPosizione:     5  3  1   4  2\nPermutazione:  5  3  1   4  2"
          }
        </pre>
        <p>
          Otteniamo una permutazione: ogni intero da 1 a 5 compare una volta. La
          parola di parità dello stesso tratto è invece <strong>PPDPD</strong>:
          sono due descrizioni diverse della stessa traccia.
        </p>
      </section>
      <section>
        <h2>Riassunto — Collatz incontra Fibonacci</h2>
        <p>
          La mappa di Collatz è una funzione dall’insieme degli interi positivi
          in sé stesso: associa a un intero x il valore x/2 se x è pari e il
          valore 3x + 1 se x è dispari. La congettura di Collatz afferma che,
          iterando questa mappa, si raggiunge prima o poi il numero 1.
        </p>
        <p>
          Studiamo le permutazioni che si ricavano dalle sequenze generate da
          questa iterazione. Mostriamo che, fino alla lunghezza 14, il numero di
          queste permutazioni è dato dai numeri di Fibonacci. Per lunghezze
          superiori compaiono permutazioni aggiuntive. Spiegheremo la comparsa
          di queste permutazioni e forniremo un limite superiore al loro numero
          esatto.
        </p>
        <p className={styles.note}>
          Questo limite di lunghezza 14 riguarda le permutazioni studiate
          nell’<a href="https://permutatriangle.github.io/assets/talks/collatz/PPposter.pdf" target="_blank" rel="noopener noreferrer">articolo</a>. Il conteggio delle parole senza DD del laboratorio
          continua invece a seguire Fibonacci anche per lunghezze maggiori.
        </p>
        <p>
          Fonte: Michael Albert, Bjarki Gudmundsson e Henning Ulfarsson,{" "}
          <a
            href="https://permutatriangle.github.io/papers/2019-02-20-collatz.html"
            target="_blank"
            rel="noreferrer"
          >
            Collatz Meets Fibonacci
          </a>
          , Mathematics Magazine, 2022.
        </p>
      </section>
    </article>
  );
}
