import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";

const app = express();

// ✅ CORS para producción y local
app.use(
  cors({
    origin: [
      "https://zenda-mvp.vercel.app/", // 🔹 dominio de tu frontend en producción
      "http://localhost:5173",               // 🔹 para desarrollo local
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use("/auth", authRoutes);

app.get("/", (req, res) => res.send("Zenda API funcionando ✅"));

app.listen(process.env.PORT || 4000, () =>
  console.log("🚀 Servidor activo en puerto", process.env.PORT || 4000)
);
