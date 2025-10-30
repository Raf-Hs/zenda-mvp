import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);

app.get("/", (req, res) => res.send("Zenda API funcionando ✅"));

app.listen(4000, () => console.log("🚀 Servidor activo en puerto 4000"));
