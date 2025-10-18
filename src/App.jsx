import photos from "./data/photos.json";
import VoteForm from "./components/VoteForm";
import Results from "./components/Results";
import LoginModal from "./components/Login";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useState } from "react";

function App() {
  const [showResults, setShowResults] = useState(false);
  const [autenticado, setAutenticado] = useState(false);
  const [mostrarLogin, setMostrarLogin] = useState(false);

  const handleLogin = () => {
    setAutenticado(true);
    setMostrarLogin(false);
    setShowResults(true);
  };

  const handleLogout = () => {
    setAutenticado(false);
    setShowResults(false);
  };

  return (
    <div className="App">
      <Navbar
        onLoginClick={() => setMostrarLogin(true)}
        autenticado={autenticado}
        onLogout={handleLogout}
      />

      {mostrarLogin && (
        <LoginModal onLogin={handleLogin} onClose={() => setMostrarLogin(false)} />
      )}

      {showResults && autenticado ? (
        <Results photos={photos} />
      ) : (
        <VoteForm photos={photos} />
      )}

      <Footer />
    </div>
  );
}

export default App;
