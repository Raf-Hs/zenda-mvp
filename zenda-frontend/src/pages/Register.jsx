import { useNavigate } from "react-router-dom";
import "./Auth.css";

export default function Register() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <img src="/zenda-logo.png" alt="Zenda logo" className="auth-logo" />
        <h1 className="auth-title">Zenda</h1>
        <h2 className="auth-subtitle">Crear cuenta</h2>

        <form onSubmit={handleSubmit} className="auth-form">
          <input type="text" placeholder="Nombre completo" className="auth-input" />
          <input type="email" placeholder="Correo electrónico" className="auth-input" />
          <input type="tel" placeholder="Teléfono" className="auth-input" />
          <input type="password" placeholder="Contraseña" className="auth-input" />

          <button type="submit" className="auth-button">
            Registrarse
          </button>
        </form>

        <p className="auth-footer">
          ¿Ya tienes cuenta?
          <button onClick={() => navigate("/")} className="auth-link">
            Inicia sesión
          </button>
        </p>
      </div>
    </div>
  );
}
