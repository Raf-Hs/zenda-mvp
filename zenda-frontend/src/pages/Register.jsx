import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

export default function Register() {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    telefono: "",
    password: "",
    rol: "cliente",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:4000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      alert("✅ Registro exitoso. Ahora inicia sesión.");
      navigate("/login");
    } catch (err) {
      alert(`⚠️ ${err.message}`);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <img src="/Zenda Logo A.png" alt="Zenda logo" className="auth-logo" />
        <h1 className="auth-title">Crea tu cuenta</h1>
        <form onSubmit={handleSubmit} className="auth-form">
          <input
            type="text"
            name="nombre"
            placeholder="Nombre completo"
            className="auth-input"
            value={form.nombre}
            onChange={handleChange}
            required
          />
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
            type="text"
            name="telefono"
            placeholder="Teléfono (opcional)"
            className="auth-input"
            value={form.telefono}
            onChange={handleChange}
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

          {/* 👇 Nuevo selector de rol */}
          <select
            name="rol"
            value={form.rol}
            onChange={handleChange}
            className="auth-input"
          >
            <option value="cliente">Cliente</option>
            <option value="prestador">Prestador de servicios</option>
          </select>

          <button type="submit" className="auth-button">
            Registrarse
          </button>
        </form>

        <p className="auth-footer">
          ¿Ya tienes cuenta?
          <button onClick={() => navigate("/login")} className="auth-link">
            Inicia sesión
          </button>
        </p>
      </div>
    </div>
  );
}
