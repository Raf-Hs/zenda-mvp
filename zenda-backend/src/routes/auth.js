import express from "express";
import { prisma } from "../db.js";

const router = express.Router();

// ========================================
// REGISTRO CON PRISMA
// ========================================
router.post("/register", async (req, res) => {
  const { nombre, email, telefono, password, rol } = req.body;

  if (!nombre || !email || !password || !rol) {
    return res.status(400).json({ message: "Faltan campos obligatorios" });
  }

  try {
    const existe = await prisma.usuario.findUnique({ where: { email } });
    if (existe) {
      return res.status(409).json({ message: "El correo ya está registrado" });
    }

    const nuevo = await prisma.usuario.create({
      data: { nombre, email, telefono, password, rol },
      select: { id: true, nombre: true, email: true, rol: true },
    });

    console.log(`✅ Nuevo usuario registrado: ${nuevo.nombre} (${nuevo.rol})`);
    res.status(201).json({ message: "Registro exitoso", usuario: nuevo });
  } catch (err) {
    console.error("❌ Error al registrar usuario:", err.message);
    res.status(500).json({ message: "Error interno al registrar usuario" });
  }
});

// ========================================
// LOGIN CON PRISMA
// ========================================
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Faltan credenciales" });
  }

  try {
    const usuario = await prisma.usuario.findFirst({
      where: { email, password },
    });

    if (!usuario) {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    const token = `token-${usuario.id}-${Date.now()}`;
    res.json({
      message: "Inicio de sesión exitoso ✅",
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol,
      },
      token,
    });
  } catch (err) {
    console.error("❌ Error al iniciar sesión:", err.message);
    res.status(500).json({ message: "Error interno al iniciar sesión" });
  }
});

// 🔹 Listar todos los usuarios
router.get("/users", async (req, res) => {
  try {
    const usuarios = await prisma.usuario.findMany({
      orderBy: { id: "asc" },
      select: {
        id: true,
        nombre: true,
        email: true,
        telefono: true,
        rol: true,
        creadoEn: true,
      },
    });
    res.json(usuarios);
  } catch (error) {
    console.error("❌ Error Prisma:", error);
    res.status(500).json({ message: "Error al obtener usuarios" });
  }
});

// 🔹 Listar solo clientes
router.get("/clientes", async (req, res) => {
  try {
    const clientes = await prisma.usuario.findMany({
      where: { rol: "cliente" },
      orderBy: { id: "asc" },
    });
    res.json(clientes);
  } catch (error) {
    console.error("❌ Error Prisma:", error);
    res.status(500).json({ message: "Error al obtener clientes" });
  }
});

export default router;
