import { Router, Request, Response, RequestHandler } from "express";
import { Curso } from "../models/Curso";
import { EntityFactory } from "../models/entityFactory";
import DatabaseSingleton from "../data-source";

const router = Router();
const cursoRepo = DatabaseSingleton.getInstance().getDataSource().getRepository(Curso);

// Crear un nuevo curso
router.post("/curso", (async (req: Request, res: Response) => {
  try {
    const { nombre, descripcion } = req.body;
    const curso = EntityFactory.createCurso(nombre, descripcion);
    await cursoRepo.save(curso);
    res.status(201).json(curso);
  } catch (e) {
    console.error('Se detectó un error, se relanza:', e);
    throw e;
  }
}) as RequestHandler);

// Obtener todos los cursos
router.get("/curso", (async (_req: Request, res: Response) => {
  try {
    const cursos = await cursoRepo.find({
      relations: ["estudiantes"]
    });
    res.json(cursos);
  } catch (e) {
    console.error('Se detectó un error, se relanza:', e);
    throw e;
  }
}) as RequestHandler);

// Obtener un curso por ID
router.get("/curso/:id", (async (req: Request, res: Response) => {
  try {
    const curso = await cursoRepo.findOne({
      where: { id: parseInt(req.params.id) },
      relations: ["estudiantes"]
    });

    if (!curso) {
      return res.status(404).json({ error: "Curso no encontrado" });
    }

    res.json(curso);
  } catch (e) {
    console.error('Se detectó un error, se relanza:', e);
    throw e;
  }
}) as RequestHandler);

// Actualizar un curso
router.put("/curso/:id", (async (req: Request, res: Response) => {
  try {
    const { nombre, descripcion } = req.body;
    const curso = await cursoRepo.findOneBy({ id: parseInt(req.params.id) });

    if (!curso) {
      return res.status(404).json({ error: "Curso no encontrado" });
    }

    curso.nombre = nombre;
    curso.descripcion = descripcion;
    await cursoRepo.save(curso);
    res.json(curso);
  } catch (error) {
    res.status(500).json({ error: 'Se detectó un error al crear curso:', details: error });
  }
}) as RequestHandler);

// Eliminar un curso
router.delete("/curso/:id", (async (req: Request, res: Response) => {
  try {
    const result = await cursoRepo.delete(parseInt(req.params.id));

    if (result.affected === 0) {
      return res.status(404).json({ error: "Curso no encontrado" });
    }

    res.json({ mensaje: "Curso eliminado correctamente" });
  } catch (e) {
    console.error('Se detectó un error, se relanza:', e);
    throw e;
  }
}) as RequestHandler);

export default router;
