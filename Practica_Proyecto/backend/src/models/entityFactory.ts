// src/models/entityFactory.ts
import { Curso } from "./Curso";
import { Estudiante } from "./Estudiantes";

export class EntityFactory {
  static createCurso(nombre: string, descripcion: string): Curso {
    const curso = new Curso();
    curso.nombre = nombre;
    curso.descripcion = descripcion;
    return curso;
  }

  static createEstudiante(nombre: string, email: string, cedula: number, curso?: Curso): Estudiante {
    const estudiante = new Estudiante();
    estudiante.nombre = nombre;
    estudiante.email = email;
    estudiante.cedula = cedula;

    if (curso) {
      estudiante.curso = curso;
    }

    return estudiante;
  }
}
