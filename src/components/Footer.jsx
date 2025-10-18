import { useState } from "react";
import "../CSS/Footer.css";

const Footer = () => {
  const [mensaje, setMensaje] = useState("");

  const manejarReset = () => {
    const clave = prompt("🔐 Ingresá la contraseña para resetear el voto:");
    if (clave === "fiesta1980") {
      localStorage.removeItem("yaVoto");
      setMensaje("✅ Voto reseteado en este dispositivo.");
    } else {
      setMensaje("❌ Contraseña incorrecta.");
    }

    setTimeout(() => setMensaje(""), 4000);
  };

  return (
    <footer className="footer">
      <p>© Facuu 2025 Fiesta Retro 1980</p>

      <button className="admin-btn" onClick={manejarReset}>
        Admin
      </button>

      {mensaje && <div className="mensaje-reset">{mensaje}</div>}
    </footer>
  );
};

export default Footer;
