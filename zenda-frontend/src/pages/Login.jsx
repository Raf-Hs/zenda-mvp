import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Datos incorrectos");

      // ✅ Guardamos sesión y redirigimos según el rol
      localStorage.setItem("usuarioZenda", JSON.stringify(data.usuario));

      if (data.usuario.rol === "prestador") navigate("/prestador");
      else navigate("/home");
    } catch (err) {
      alert(`⚠️ ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <img src="/zenda-logo.png" alt="Zenda logo" className="auth-logo" />
        <h1 className="auth-title">Bienvenido</h1>
        <h2 className="auth-subtitle">Inicia sesión en tu cuenta Zenda</h2>

        <form onSubmit={handleSubmit} className="auth-form">
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            className="auth-input"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            className="auth-input"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? "Ingresando..." : "Ingresar"}
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
