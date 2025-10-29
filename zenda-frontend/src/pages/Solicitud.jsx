import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

export default function Solicitud() {
  const navigate = useNavigate();
  const [paso, setPaso] = useState(1);
  const [solicitud, setSolicitud] = useState({
    titulo: "",
    descripcion: "",
    estado: "pendiente",
  });

  // Manejo de cambios
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSolicitud((prev) => ({ ...prev, [name]: value }));
  };

  // Enviar formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    setPaso(2); // pasa a cotización
  };

  // Simular cotización
  const aprobarCotizacion = () => {
    const cotizacion = {
      ...solicitud,
      costo: Math.floor(Math.random() * (1500 - 300 + 1)) + 300,
      estado: "cotizacion_aprobada",
    };
    localStorage.setItem("solicitudZenda", JSON.stringify(cotizacion));
    setSolicitud(cotizacion);
    setPaso(3);
  };

  // Simular pago aprobado
  const confirmarPago = () => {
    const actualizado = { ...solicitud, estado: "pago_aprobado" };
    localStorage.setItem("solicitudZenda", JSON.stringify(actualizado));
    navigate("/detalle");
  };

  // Reiniciar
  const volver = () => {
    setPaso(1);
    setSolicitud({ titulo: "", descripcion: "", estado: "pendiente" });
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <img src="/Zenda Logo A.png" alt="Zenda logo" className="auth-logo" />

        {paso === 1 && (
          <>
            <h1 className="auth-title">Nueva solicitud</h1>
            <h2 className="auth-subtitle">
              Describe brevemente el trabajo que deseas solicitar.
            </h2>

            <form onSubmit={handleSubmit} className="auth-form">
              <input
                type="text"
                name="titulo"
                placeholder="Título de la solicitud"
                className="auth-input"
                value={solicitud.titulo}
                onChange={handleChange}
                required
              />
              <textarea
                name="descripcion"
                placeholder="Descripción del trabajo"
                rows="4"
                className="auth-input"
                value={solicitud.descripcion}
                onChange={handleChange}
                required
              ></textarea>

              <button type="submit" className="auth-button">
                Enviar solicitud →
              </button>
            </form>
          </>
        )}

        {paso === 2 && (
          <>
            <h1 className="auth-title">Cotización generada</h1>
            <p className="auth-subtitle">
              Tu solicitud ha sido revisada. Se generó una cotización simulada.
            </p>

            <div className="auth-box-mini">
              <p><strong>Título:</strong> {solicitud.titulo}</p>
              <p><strong>Costo estimado:</strong> ${Math.floor(Math.random() * (1500 - 300 + 1)) + 300} MXN</p>
              <p>¿Deseas aprobar esta cotización?</p>
            </div>

            <button onClick={aprobarCotizacion} className="auth-button">
              Aprobar cotización
            </button>

            <button onClick={volver} className="auth-link">
              Volver al formulario
            </button>
          </>
        )}

        {paso === 3 && (
          <>
            <h1 className="auth-title">Pago</h1>
            <p className="auth-subtitle">
              Simula la confirmación del pago para avanzar al detalle del trabajo.
            </p>

            <div className="auth-box-mini">
              <p><strong>Título:</strong> {solicitud.titulo}</p>
              <p><strong>Monto:</strong> ${solicitud.costo} MXN</p>
              <p><strong>Estado:</strong> Cotización aprobada ✅</p>
            </div>

            <button onClick={confirmarPago} className="auth-button">
              Confirmar pago →
            </button>
          </>
        )}

        <p className="auth-footer">
          <button onClick={() => navigate("/home")} className="auth-link">
            Volver al dashboard
          </button>
        </p>
      </div>
    </div>
  );
}
