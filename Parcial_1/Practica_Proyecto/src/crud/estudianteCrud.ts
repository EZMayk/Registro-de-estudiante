import { Router, Request, Response, RequestHandler } from "express";
import { appdataSource } from "../data-source";
import { Estudiante } from "../models/Estudiantes";
import { Curso } from "../models/Curso";

const router = Router();
const estudianteRepo = appdataSource.getRepository(Estudiante);
const cursoRepo = appdataSource.getRepository(Curso);

// Crear un nuevo estudiante
router.post("/estudiante", (async (req: Request, res: Response) => {
  try {
    const { nombre, email, cursoId } = req.body;

    if (cursoId) {
      const curso = await cursoRepo.findOneBy({ id: cursoId });
      if (!curso) {
        return res.status(404).json({ error: "Curso no encontrado" });
      }

      const estudiante = estudianteRepo.create({ nombre, email, curso });
      await estudianteRepo.save(estudiante);
      res.status(201).json(estudiante);
    } else {
      const estudiante = estudianteRepo.create({ nombre, email });
      await estudianteRepo.save(estudiante);
      res.status(201).json(estudiante);
    }
  } catch (error) {
    res.status(500).json({ error: "Error al crear el estudiante" });
  }
}) as RequestHandler);

// Obtener todos los estudiantes
router.get("/estudiante", (async (_req: Request, res: Response) => {
  try {
    const estudiantes = await estudianteRepo.find({
      relations: ["curso"]
    });
    res.json(estudiantes);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los estudiantes" });
  }
}) as RequestHandler);

// Obtener un estudiante por ID
router.get("/estudiante/:id", (async (req: Request, res: Response) => {
  try {
    const estudiante = await estudianteRepo.findOne({
      where: { id: parseInt(req.params.id) },
      relations: ["curso"]
    });

    if (!estudiante) {
      return res.status(404).json({ error: "Estudiante no encontrado" });
    }

    res.json(estudiante);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el estudiante" });
  }
}) as RequestHandler);

// Actualizar un estudiante
router.put("/estudiante/:id", (async (req: Request, res: Response) => {
  try {
    const { nombre, email, cursoId } = req.body;
    const estudiante = await estudianteRepo.findOne({
      where: { id: parseInt(req.params.id) },
      relations: ["curso"]
    });

    if (!estudiante) {
      return res.status(404).json({ error: "Estudiante no encontrado" });
    }

    if (cursoId) {
      const curso = await cursoRepo.findOneBy({ id: cursoId });
      if (!curso) {
        return res.status(404).json({ error: "Curso no encontrado" });
      }
      estudiante.curso = curso;
    }

    estudiante.nombre = nombre;
    estudiante.email = email;
    await estudianteRepo.save(estudiante);
    res.json(estudiante);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el estudiante" });
  }
}) as RequestHandler);

// Eliminar un estudiante
router.delete("/estudiante/:id", (async (req: Request, res: Response) => {
  try {
    const result = await estudianteRepo.delete(parseInt(req.params.id));

    if (result.affected === 0) {
      return res.status(404).json({ error: "Estudiante no encontrado" });
    }

    res.json({ mensaje: "Estudiante eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el estudiante" });
  }
}) as RequestHandler);

export default router; 