import { useState, useEffect } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import "../CSS/VoteForm.css";

export default function VoteForm({ photos }) {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  useEffect(() => {
    const storedVote = localStorage.getItem("userVote");
    if (storedVote) setHasVoted(true);
  }, []);

  const showMessage = (text, type = "success") => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: "", type: "" }), 3000);
  };

  const handleSubmitVote = async () => {
    if (!selectedPhoto) {
      showMessage("Elegí una foto antes de votar.", "error");
      return;
    }

    if (hasVoted) {
      showMessage("Ya votaste. Solo se permite un voto.", "error");
      return;
    }

    const voteData = { mejor: selectedPhoto.id };
    await addDoc(collection(db, "votes"), voteData);
    localStorage.setItem("userVote", selectedPhoto.id);
    setHasVoted(true);

    showMessage("✅ Voto registrado", "success");
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
