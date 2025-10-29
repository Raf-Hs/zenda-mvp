import { useNavigate } from "react-router-dom";
import "./DashboardMobile.css";

export default function Home() {
  const navigate = useNavigate();

  const paquetes = [
    {
      nombre: "Básico",
      precio: 299,
      desc: "Tareas administrativas simples y seguimiento básico.",
    },
    {
      nombre: "Profesional",
      precio: 599,
      desc: "Gestión de documentos, cotizaciones y reportes.",
    },
    {
      nombre: "Empresarial",
      precio: 999,
      desc: "Control completo del flujo, atención personalizada y soporte extendido.",
    },
  ];

  return (
    <div className="mobile-dashboard">
      {/* Encabezado */}
      <header className="dash-header">
        <img src="/Zenda Logo A.png" alt="Zenda logo" className="dash-logo" />
        <h1 className="dash-title">Zenda</h1>
        <p className="dash-subtitle">Asistente Administrativa Virtual</p>
      </header>

      {/* Panel principal */}
      <section className="dash-section">
        <h2 className="section-title">Panel principal</h2>

        <div className="card-list">
          <div className="dash-card">
            <h3>📝 Nueva solicitud</h3>
            <p>Crea una solicitud rápida de trabajo o servicio administrativo.</p>
            <button
              className="card-btn"
              onClick={() => navigate("/solicitud")}
            >
              Crear solicitud
            </button>
          </div>

          <div className="dash-card">
            <h3>📄 Detalle de solicitud</h3>
            <p>Consulta el estado o avance de una solicitud existente.</p>
            <button className="card-btn" onClick={() => navigate("/detalle")}>
              Ver detalle
            </button>
          </div>
        </div>
      </section>

      {/* Sección de paquetes */}
      <section className="dash-section paquetes-section">
        <h2 className="section-title">Paquetes Zenda</h2>

        <div className="card-list">
          {paquetes.map((p) => (
            <div key={p.nombre} className="dash-card paquete-card">
              <h3>{p.nombre}</h3>
              <p>{p.desc}</p>
              <p className="paquete-precio">${p.precio} MXN</p>
              <button
                className="card-btn"
                onClick={() => navigate("/solicitud")}
              >
                Solicitar este paquete →
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="dash-footer">
        <p className="dash-copy">© 2025 Zenda</p>
      </footer>
    </div>
  );
}
