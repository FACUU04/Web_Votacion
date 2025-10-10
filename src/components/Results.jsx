import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import "../CSS/Results.css";

export default function Results({ photos }) {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "votes"), (snapshot) => {
      const counts = {};

      snapshot.forEach((doc) => {
        const v = doc.data();
        if (v.mejor) {
          counts[v.mejor] = (counts[v.mejor] || 0) + 1;
        }
      });

      const resultsArray = photos.map((p) => ({
        id: p.id,
        name: p.name,
        url: p.url,
        mejor: counts[p.id] || 0,
      }));

      resultsArray.sort((a, b) => b.mejor - a.mejor);
      setResults(resultsArray);
    });

    return () => unsubscribe();
  }, [photos]);

  return (
    <div className="results-container">
      <h2>📈 Resultados</h2>
      <div className="results-grid">
        {results.map((r) => (
          <div key={r.id} className="result-card">
            <img src={r.url} alt={r.name} loading="lazy" />
            <h3>{r.name}</h3>
            <p>🥇 Votos: {r.mejor}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
