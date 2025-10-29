import { useState, useEffect } from "react";
import "./Detalle.css";

export default function Detalle() {
  const [etapaIndex, setEtapaIndex] = useState(0);
  const [progreso, setProgreso] = useState(0);
  const [asignado, setAsignado] = useState(null);
  const [serviciosSeleccionados, setServiciosSeleccionados] = useState([]);

  const etapas = [
    "Selección de servicios",
    "Asignación de trabajador",
    "Inicio del trabajo",
    "Entrega de documentos",
    "Trabajo en progreso",
    "Revisión interna",
    "Entrega preliminar",
    "Firma y entrega del proyecto",
    "Factura",
    "Pedido cerrado ✅",
  ];

  const serviciosSimulados = [
    { id: 1, nombre: "Redacción de documentos" },
    { id: 2, nombre: "Gestión de agenda" },
    { id: 3, nombre: "Cotización y facturación" },
    { id: 4, nombre: "Atención a clientes" },
    { id: 5, nombre: "Control de archivos" },
  ];

  const usuariosSimulados = [
    { id: 1, nombre: "María López", distancia: "1.2 km", rating: 4.8 },
    { id: 2, nombre: "Carlos Hernández", distancia: "2.0 km", rating: 4.6 },
    { id: 3, nombre: "Fernanda Torres", distancia: "1.8 km", rating: 4.9 },
  ];

  // Simulación automática del flujo
  useEffect(() => {
    if (etapaIndex >= 4 && etapaIndex < etapas.length - 1) {
      setProgreso(50);
      const timer = setTimeout(() => {
        setProgreso(100);
        setTimeout(() => setEtapaIndex((prev) => prev + 1), 1500);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [etapaIndex]);

  const toggleServicio = (s) => {
    setServiciosSeleccionados((prev) =>
      prev.some((sel) => sel.id === s.id)
        ? prev.filter((sel) => sel.id !== s.id)
        : [...prev, s]
    );
  };

  const handleAvanzar = () => {
    if (etapaIndex < etapas.length - 1) setEtapaIndex((prev) => prev + 1);
  };

  return (
    <div className="mobile-dashboard">
      <header className="dash-header">
        <img src="/Zenda Logo A.png" alt="Zenda logo" className="dash-logo" />
        <h1 className="dash-title">Seguimiento del trabajo</h1>
        <p className="dash-subtitle">Flujo administrativo paso a paso</p>
      </header>

      <div className="dash-section">
        <div className="dash-card">
          {/* Paso 1: Selección de servicios */}
          {etapaIndex === 0 && (
            <>
              <p className="section-title">Selecciona uno o varios servicios:</p>
              {serviciosSimulados.map((s) => {
                const seleccionado = serviciosSeleccionados.some(
                  (sel) => sel.id === s.id
                );
                return (
                  <div
                    key={s.id}
                    className={`servicio-card ${
                      seleccionado ? "seleccionado" : ""
                    }`}
                    onClick={() => toggleServicio(s)}
                  >
                    <div className="servicio-header">
                      <p className="servicio-nombre">{s.nombre}</p>
                      {seleccionado && <span className="check">✅</span>}
                    </div>
                  </div>
                );
              })}

              {serviciosSeleccionados.length > 0 && (
                <button onClick={handleAvanzar} className="card-btn">
                  Continuar →
                </button>
              )}
            </>
          )}

          {/* Paso 2: Asignación */}
          {etapaIndex === 1 && (
            <>
              <p className="section-title">Usuarios disponibles:</p>
              {usuariosSimulados.map((u) => (
                <div
                  key={u.id}
                  className={`usuario-card ${
                    asignado?.id === u.id ? "seleccionado" : ""
                  }`}
                  onClick={() => setAsignado(u)}
                >
                  <p className="usuario-nombre">{u.nombre}</p>
                  <p className="usuario-info">
                    {u.distancia} — ⭐ {u.rating}
                  </p>
                </div>
              ))}
              {asignado && (
                <button onClick={handleAvanzar} className="card-btn">
                  Asignar a {asignado.nombre} →
                </button>
              )}
            </>
          )}

          {/* Paso 3 en adelante: seguimiento tipo checklist */}
          {etapaIndex >= 2 && (
            <div className="seguimiento">
              <p className="section-title">Hacer seguimiento de pedido:</p>
              <ul className="seguimiento-lista">
                {etapas.slice(2).map((etapa, i) => {
                  const globalIndex = i + 2;
                  const completado = globalIndex < etapaIndex;
                  const actual = globalIndex === etapaIndex;
                  return (
                    <li
                      key={etapa}
                      className={`seguimiento-item ${
                        completado ? "completado" : actual ? "actual" : ""
                      }`}
                    >
                      <span className="icono">
                        {completado ? "✔️" : actual ? "🕓" : "⭕"}
                      </span>
                      <span>{etapa}</span>
                    </li>
                  );
                })}
              </ul>

              {etapaIndex < etapas.length - 1 && (
                <button onClick={handleAvanzar} className="card-btn">
                  Simular siguiente etapa →
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <footer className="dash-footer">
        <p className="dash-copy">Zenda © 2025</p>
      </footer>
    </div>
  );
}
