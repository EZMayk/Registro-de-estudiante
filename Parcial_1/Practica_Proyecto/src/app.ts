import "reflect-metadata";
import express, { Request, Response, NextFunction } from "express";
import { appdataSource } from "./data-source";
import cursoRouter from "./crud/cursoCrud";
import estudianteRouter from "./crud/estudianteCrud";

const app = express();
app.use(express.json());

// Middleware para manejar errores CORS
app.use((_req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// Middleware para manejar errores globales
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error("Error:", err);
  res.status(500).json({
    error: "Error interno del servidor",
    mensaje: "Ha ocurrido un error al procesar la solicitud"
  });
});

// Rutas
app.use("/api/cursos", cursoRouter);
app.use("/api/estudiantes", estudianteRouter);

// Inicializar la base de datos y el servidor
appdataSource.initialize()
  .then(() => {
    console.log("Base de datos inicializada correctamente");
    
    app.listen(3000, () => {
      console.log("Servidor iniciado en http://localhost:3000");
    });
  })
  .catch((error) => {
    console.error("Error al inicializar la base de datos:", error);
  });
