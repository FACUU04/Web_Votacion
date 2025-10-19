import { useState, useEffect } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import "../CSS/VoteForm.css";

export default function VoteForm({ photos }) {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const VOTE_LIMIT = 3; // 🔹 límite máximo de votos

  useEffect(() => {
    const storedVotes = localStorage.getItem("userVotes1");
    if (storedVotes) {
      const voteCount = parseInt(storedVotes, 10);
      if (voteCount >= VOTE_LIMIT) setHasVoted(true);
    }
  }, []);

  const showMessage = (text, type = "success") => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: "", type: "" }), 3000);
  };

  const handleSubmitVote = async () => {
    const storedVotes = localStorage.getItem("userVotes1");
    const currentCount = storedVotes ? parseInt(storedVotes, 10) : 0;

    if (!selectedPhoto) {
      showMessage("Elegí una foto antes de votar.", "error");
      return;
    }

    if (currentCount >= VOTE_LIMIT) {
      showMessage(`Ya alcanzaste el límite de ${VOTE_LIMIT} votos.`, "error");
      setSelectedPhoto(null);
      return;
    }

    try {
      const voteData = { mejor: selectedPhoto.id };
      await addDoc(collection(db, "votes"), voteData);

      // Guardar nuevo conteo en localStorage
      const newCount = currentCount + 1;
      localStorage.setItem("userVotes1", newCount);

      if (newCount >= VOTE_LIMIT) setHasVoted(true);

      showMessage(`✅ Voto ${newCount} de ${VOTE_LIMIT} registrado`, "success");
    } catch (error) {
      console.error("Error al registrar el voto:", error);
      showMessage("Error al registrar el voto. Intentá de nuevo.", "error");
    }

    setSelectedPhoto(null);
  };

  return (
    <div className="vote-container">
      <h2>🎉 Votá tu outfit favorito</h2>

      <div className="photo-grid">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="photo-card"
            onClick={() => setSelectedPhoto(photo)}
          >
            <img src={photo.url} alt={photo.name} loading="lazy" />
          </div>
        ))}
      </div>

      {selectedPhoto && (
        <div className="modal-overlay" onClick={() => setSelectedPhoto(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <img src={selectedPhoto.url} alt={selectedPhoto.name} loading="lazy" />
            <h3>{selectedPhoto.name}</h3>

            <button
              className={`submit-vote ${hasVoted ? "already-voted" : ""}`}
              onClick={handleSubmitVote}
              disabled={hasVoted}
            >
              🥇 Votar como Mejor
            </button>
          </div>
        </div>
      )}

      {message.text && (
        <div className={`vote-message ${message.type}`}>
          {message.text}
        </div>
      )}
    </div>
  );
}
