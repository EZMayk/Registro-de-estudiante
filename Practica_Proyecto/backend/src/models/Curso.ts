import "reflect-metadata";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Estudiante } from "./Estudiantes";

@Entity()
export class Curso {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombre!: string;

  @Column()
  descripcion!: string;

  @OneToMany(() => Estudiante, (estudiante) => estudiante.curso)
  estudiantes!: Estudiante[];
}
