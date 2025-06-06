import "reflect-metadata";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Curso } from "./Curso";

@Entity()
export class Estudiante {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombre!: string;

  @Column()
  email!: string;

  @Column()
  cedula!: number;

  @ManyToOne(() => Curso, (curso) => curso.estudiantes, { nullable: true })
  curso!: Curso;
}
