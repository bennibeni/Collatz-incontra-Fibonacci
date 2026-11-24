# Collatz × Fibonacci

App React autonoma: dall’orbita numerica alla parola di parità, dall’automa al conteggio di Fibonacci. Per chi conosce Collatz e Fibonacci ma incontra per la prima volta orbite e automi.

## Avvio

Richiede Node.js 20.19+ oppure 22.12+.

```sh
npm install
npm run dev
```

Apri l’indirizzo stampato da Vite. Per una copia già installata basta `npm run dev`. Verifiche: `npm test` e `npm run build`. Per vedere la build: `npm run preview`.

Su Windows puoi anche fare doppio clic su `Avvia.cmd`: avvia l’app e apre il browser. Mantieni aperta la finestra del terminale mentre usi il laboratorio.

## Contenuti

- Laboratorio: orbita e grafico, parola P/D, automa animato, conteggio ed elenco delle parole senza DD. Icone info con spiegazioni.
- Grafo e matrice: grafo delle parità, ricorrenza e conteggio attraverso la matrice di adiacenza.
- Entropia: cursore da 1 a 80 simboli, confronto fra alternanza, divieto DD e parole libere; grafico della convergenza a ln φ.
- L’articolo: esempio di permutazione e riassunto tradotto di Collatz Meets Fibonacci (2022).

La navigazione usa hash: `#/`, `#/fibonacci`, `#/entropia`, `#/permutazioni`. Compatibile con hosting statico senza regole di riscrittura. Nessuna autenticazione o backend. Nessun servizio esterno necessario per i calcoli.

## Convenzioni

C(n)=n/2 se pari, 3n+1 se dispari. k valori producono k simboli e k−1 transizioni. Entrambe le parità iniziali sono ammesse: le parole sono F(k+2). Il grafo rappresenta possibilità di parità; per scegliere l’uscita da P serve il numero concreto.

Calcoli esatti con BigInt; input positivi fino a 100 cifre. Grafico logaritmico approssimato. La simulazione si ferma a 1 o a 2000 passi; il limite non stabilisce se l’orbita converga. L’elenco mostra al massimo 144 parole, indicando quando è parziale; il conteggio resta esatto. L’entropia riguarda il sistema simbolico del grafo, non una prova della congettura né l’entropia della dinamica numerica sugli interi.

Aprire un approfondimento sospende la riproduzione e conserva la traiettoria del laboratorio. Nessuna persistenza dopo il ricaricamento.
