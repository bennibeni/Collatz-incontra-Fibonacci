import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import Link from "./Link.jsx";
import Laboratory from "./CollatzFibonacci.jsx";
import Fibonacci from "./fibonacci/page.jsx";
import Entropy from "./entropia/page.jsx";
import Permutations from "./permutazioni.jsx";
import "./app.css";

function App() {
  const [route, setRoute] = useState(
    () => window.location.hash.slice(1) || "/",
  );
  useEffect(() => {
    const update = () => {
      setRoute(window.location.hash.slice(1) || "/");
      window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", update);
    return () => window.removeEventListener("hashchange", update);
  }, []);
  useEffect(() => {
    document.title =
      {
        "/": "Laboratorio",
        "/fibonacci": "Grafo e matrice",
        "/entropia": "Entropia topologica",
        "/permutazioni": "Le permutazioni",
      }[route] + " · Collatz × Fibonacci";
  }, [route]);
  const known = ["/", "/fibonacci", "/entropia", "/permutazioni"].includes(
    route,
  );
  return (
    <>
      <nav className="app-nav" aria-label="Navigazione principale">
        <Link href="/R28" className="brand">
          Collatz <span>×</span> Fibonacci
        </Link>
        <div>
          {[
            ["/", "Laboratorio"],
            ["/fibonacci", "Grafo e matrice"],
            ["/entropia", "Entropia"],
            ["/permutazioni", "Permutazioni"],
          ].map(([path, title]) => (
            <a
              key={path}
              href={"#" + path}
              aria-current={route === path ? "page" : undefined}
            >
              {title}
            </a>
          ))}
          <a href="https://permutatriangle.github.io/assets/talks/collatz/PPposter.pdf" target="_blank" rel="noopener noreferrer">L’articolo</a>
        </div>
      </nav>
      <div hidden={route !== "/"}>
        <Laboratory />
      </div>
      {route === "/fibonacci" && <Fibonacci />}
      {route === "/entropia" && <Entropy />}
      {route === "/permutazioni" && <Permutations />}
      {!known && (
        <main className="not-found">
          <h1>Pagina non trovata</h1>
          <Link href="/R28">Torna al laboratorio</Link>
        </main>
      )}
      <footer className="projects-footer">
        <a href="https://links-page-bennibeni.vercel.app/">← ALLLINKS</a>
        <span>Collatz × Fibonacci</span>
      </footer>
    </>
  );
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
