import "../CSS/Navbar.css"

export default function Navbar({ onLoginClick, autenticado, onLogout }) {
  return (
    <nav className="navbar">
      <span className="logo">🎈 FIESTA ´80</span>
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
