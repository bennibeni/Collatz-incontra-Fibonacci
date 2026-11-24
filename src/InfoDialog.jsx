import React from "react";

import { Info, X } from "lucide-react";
import {
  Button,
  Dialog,
  DialogTrigger,
  Heading,
  Modal,
  ModalOverlay,
} from "react-aria-components";

export default function InfoDialog({ topic }) {
  const automaton = topic === "automaton";
  const fibonacci = topic === "fibonacci";
  const title = fibonacci
    ? "Perché il conteggio segue Fibonacci?"
    : automaton
      ? "Che cos’è l’automa delle parità?"
      : "Che cos’è un’orbita di Collatz?";
  return (
    <DialogTrigger>
      <Button className="cf-info-button" aria-label={title}>
        <Info size={18} aria-hidden="true" />
      </Button>
      <ModalOverlay isDismissable className="cf-info-overlay">
        <Modal className="cf-info-modal">
          <Dialog className="cf-info-dialog">
            {({ close }) => (
              <>
                <div className="cf-info-heading">
                  <Heading slot="title">{title}</Heading>
                  <Button
                    className="cf-info-close"
                    onPress={close}
                    aria-label="Chiudi spiegazione"
                  >
                    <X size={20} aria-hidden="true" />
                  </Button>
                </div>
                {fibonacci ? (
                  <>
                    <p>
                      Dividiamo le sequenze valide in{" "}
                      <strong>due gruppi</strong>, guardando come finiscono.
                      Ricordiamo che l’unico vincolo è che{" "}
                      <strong>non possono esserci due D consecutivi</strong>.
                    </p>
                    <p>
                      <strong>1. Quelle che finiscono con P.</strong>
                      <br />
                      Possiamo costruirle prendendo qualsiasi sequenza valida
                      più corta di un simbolo e aggiungendo P. Aggiungere P non
                      può creare una coppia DD.
                    </p>
                    <p>
                      Per ottenere sequenze di 4 simboli, partiamo dalle cinque
                      sequenze valide di 3 simboli:
                    </p>
                    <pre>
                      {
                        "PPP + P → PPPP\nPPD + P → PPDP\nPDP + P → PDPP\nDPP + P → DPPP\nDPD + P → DPDP"
                      }
                    </pre>
                    <p>
                      Otteniamo <strong>5 sequenze</strong>.
                    </p>
                    <p>
                      <strong>2. Quelle che finiscono con D.</strong>
                      <br />
                      Possiamo aggiungere D soltanto alle sequenze che finiscono
                      con P, altrimenti creeremmo una coppia DD:
                    </p>
                    <pre>
                      {"PPP + D → PPPD\nPDP + D → PDPD\nDPP + D → DPPD"}
                    </pre>
                    <p>
                      Otteniamo altre <strong>3 sequenze</strong>.
                    </p>
                    <p>
                      Perché proprio 3? Perché le sequenze di 3 simboli che
                      finiscono con P si costruiscono aggiungendo P a tutte le
                      sequenze valide di 2 simboli:
                    </p>
                    <pre>{"PP + P → PPP\nPD + P → PDP\nDP + P → DPP"}</pre>
                    <p>
                      Aggiungere poi D equivale quindi ad aggiungere il blocco{" "}
                      <strong>PD</strong> alle tre sequenze valide di 2 simboli.
                    </p>
                    <p>
                      Abbiamo contato tutto: ogni sequenza finisce con P oppure
                      con D. E non abbiamo contato nulla due volte, perché i due
                      gruppi hanno un simbolo finale diverso.
                    </p>
                    <p>Quindi le sequenze valide di 4 simboli sono:</p>
                    <p className="cf-info-formula">5 + 3 = 8.</p>
                    <p>
                      Lo stesso ragionamento vale per ogni lunghezza, a partire
                      da 2 simboli, contando una sola sequenza vuota di
                      lunghezza 0:{" "}
                      <strong>
                        il numero di sequenze valide è la somma dei conteggi
                        delle due lunghezze precedenti
                      </strong>
                      .
                    </p>
                    <p>
                      Partendo da <strong>2</strong> sequenze di un simbolo e{" "}
                      <strong>3</strong> di due simboli, otteniamo:
                    </p>
                    <p className="cf-info-formula">2, 3, 5, 8, 13, 21, 34, …</p>
                    <p>È proprio la successione di Fibonacci!</p>
                  </>
                ) : automaton ? (
                  <>
                    <p>
                      Un automa è un modello con un insieme di stati e regole
                      per passare da uno stato all’altro. Qui conserva soltanto
                      la parità del numero corrente: <strong>P</strong> se pari,{" "}
                      <strong>D</strong> se dispari.
                    </p>
                    <ul>
                      <li>
                        <strong>P → P:</strong> dividere un pari per 2 può dare
                        un pari, come 52 → 26.
                      </li>
                      <li>
                        <strong>P → D:</strong> può anche dare un dispari, come
                        34 → 17.
                      </li>
                      <li>
                        <strong>D → P:</strong> applicare 3n + 1 a un dispari dà
                        sempre un pari, come 17 → 52.
                      </li>
                    </ul>
                    <p>
                      Lo stato illuminato mostra la parità attuale; la freccia
                      evidenziata indica l’ultimo passaggio. Non esiste una
                      freccia D → D: nella parola di parità non compaiono mai
                      due D consecutivi.
                    </p>
                    <p>
                      Il solo stato P non basta a scegliere la freccia
                      successiva: serve il valore numerico. L’automa descrive le
                      transizioni possibili, mentre Collatz determina il
                      percorso concreto. Contare le parole ammesse da queste
                      regole porta ai numeri di Fibonacci.
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      L’orbita di un numero iniziale è la sequenza ottenuta
                      applicando ripetutamente la stessa funzione. Per Collatz,
                      a ogni passo dividiamo per 2 se il numero è pari, oppure
                      calcoliamo 3n + 1 se è dispari.
                    </p>
                    <p>
                      Per esempio, l’orbita che parte da 34 comincia così:{" "}
                      <strong>34 → 17 → 52 → 26 → 13 → 40 → …</strong>. Il passo
                      0 è il valore iniziale; ogni freccia conta un nuovo passo.
                    </p>
                    <p>
                      Nel grafico, l’asse orizzontale indica il passo e
                      l’altezza rappresenta log₁₀(n): una scala logaritmica
                      permette di vedere insieme valori piccoli e grandi. Il
                      grafico si adatta ai valori visitati. Il punto più grande
                      indica il valore corrente.
                    </p>
                    <p>
                      La traccia sotto il grafico mostra i valori esatti e le
                      loro parità. Puoi cliccare un valore per tornare a quel
                      passo. Leggendo solo le parità dell’orbita ottieni la
                      parola P/D mostrata nel riquadro 03.
                    </p>
                    <p>
                      La congettura afferma che ogni orbita di interi positivi
                      raggiunge 1. Qui ci fermiamo a 1 (poi inizierebbe il ciclo
                      1 → 4 → 2 → 1) oppure al limite di 2.000 passi. Una
                      simulazione di singole orbite non dimostra la congettura.
                    </p>
                  </>
                )}
              </>
            )}
          </Dialog>
        </Modal>
      </ModalOverlay>
    </DialogTrigger>
  );
}
