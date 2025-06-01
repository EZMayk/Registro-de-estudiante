import "reflect-metadata";
import express, { Request, Response, NextFunction } from "express";
import DatabaseSingleton from "./data-source";
import cursoRouter from "./crud/cursoCrud";
import estudianteRouter from "./crud/estudianteCrud";

const app = express();
app.use(express.json());

// Middleware CORS
app.use((_req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// Middleware errores globales
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

// Inicializar base de datos y servidor
const database = DatabaseSingleton.getInstance();

database.initialize()
  .then(() => {
    app.listen(3000, () => {
      console.log("Servidor iniciado en http://localhost:3000");
    });
  })
  .catch((error) => {
    console.error("Error al inicializar la base de datos:", error);
  });
