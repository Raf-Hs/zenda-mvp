import { useNavigate } from "react-router-dom";
import "./Auth.css";

export default function Login() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/home");
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <img src="/zenda-logo.png" alt="Zenda logo" className="auth-logo" />
        <h1 className="auth-title">Zenda</h1>
        <h2 className="auth-subtitle">Inicia sesión</h2>

        <form onSubmit={handleSubmit} className="auth-form">
          <input type="email" placeholder="Correo electrónico" className="auth-input" />
          <input type="password" placeholder="Contraseña" className="auth-input" />

          <button type="submit" className="auth-button">
            Ingresar
          </button>
        </form>

        <p className="auth-footer">
          ¿No tienes cuenta?
          <button onClick={() => navigate("/register")} className="auth-link">
            Regístrate
          </button>
        </p>
      </div>
    </div>
  );
}
