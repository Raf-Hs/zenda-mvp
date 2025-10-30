import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./DashboardMobile.css";

export default function Prestador() {
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem("usuarioZenda"));
  const [trabajos, setTrabajos] = useState([]);

  // Datos simulados para MVP
  useEffect(() => {
    const trabajosSimulados = [
      {
        id: 1,
        titulo: "Redacción de documentos administrativos",
        cliente: "María López",
        fecha: "29/10/2025",
        estado: "Pendiente",
      },
      {
        id: 2,
        titulo: "Gestión de agenda semanal",
        cliente: "Carlos Hernández",
        fecha: "28/10/2025",
        estado: "En progreso",
      },
      {
        id: 3,
        titulo: "Cotización y facturación mensual",
        cliente: "José Ramírez",
        fecha: "27/10/2025",
        estado: "Completado",
      },
    ];
    setTrabajos(trabajosSimulados);
  }, []);

  const avanzarEstado = (id) => {
    setTrabajos((prev) =>
      prev.map((t) => {
        if (t.id !== id) return t;
        if (t.estado === "Pendiente") return { ...t, estado: "En progreso" };
        if (t.estado === "En progreso") return { ...t, estado: "Completado" };
        return t;
      })
    );
  };

  const cerrarSesion = () => {
    localStorage.removeItem("usuarioZenda");
    localStorage.removeItem("tokenZenda");
    navigate("/login");
  };

  return (
    <div className="mobile-dashboard">
      <header className="dash-header">
        <img src="/Zenda Logo A.png" alt="Zenda logo" className="dash-logo" />
        <h1 className="dash-title">Zenda Pro</h1>
        <p className="dash-subtitle">
          Bienvenido {usuario?.nombre || "Prestador"}
        </p>
      </header>

      <section className="dash-section">
        <h2 className="section-title">📋 Trabajos asignados</h2>

        <div className="card-list">
          {trabajos.map((t) => (
            <div key={t.id} className="dash-card">
              <h3>{t.titulo}</h3>
              <p>
                👤 {t.cliente} <br />
                📅 {t.fecha}
              </p>
              <p>
                <strong>Estado:</strong> {t.estado}
              </p>

              {t.estado !== "Completado" && (
                <button
                  onClick={() => avanzarEstado(t.id)}
                  className="card-btn"
                >
                  {t.estado === "Pendiente"
                    ? "Iniciar trabajo →"
                    : "Marcar como completado ✅"}
                </button>
              )}
            </div>
          ))}

          {trabajos.length === 0 && (
            <p className="mensaje-indicacion">No hay trabajos asignados.</p>
          )}
        </div>
      </section>

      <footer className="dash-footer">
        <button onClick={cerrarSesion} className="auth-link">
          Cerrar sesión
        </button>
        <p className="dash-copy">Zenda © 2025</p>
      </footer>
    </div>
  );
}
