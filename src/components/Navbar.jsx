import "../CSS/Navbar.css"

export default function Navbar({ onLoginClick, autenticado, onLogout }) {
  return (
    <nav className="navbar">
      <span className="logo">🕺 FIESTA RETRO</span>
      {!autenticado ? (
        <button onClick={onLoginClick} className="login-btn">
          🔐 Iniciar sesión
        </button>
      ) : (
        <button onClick={onLogout} className="logout-btn">
          🚪 Cerrar sesión
        </button>
      )}
    </nav>
  );
}
