import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Home from "./pages/Home.jsx";
import Solicitud from "./pages/Solicitud.jsx";
import Detalle from "./pages/Detalle.jsx";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/solicitud" element={<Solicitud />} />
        <Route path="/detalle" element={<Detalle />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
