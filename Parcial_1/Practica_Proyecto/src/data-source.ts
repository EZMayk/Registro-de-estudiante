import 'reflect-metadata';
import { DataSource } from "typeorm";
import { Curso } from "./models/Curso";
import { Estudiante } from "./models/Estudiantes";

export const appdataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "2025*_*",
    database: "registro-estudiante",
    synchronize: true,
    logging: true,
    entities: [Curso, Estudiante],
    subscribers: [],
    migrations: [],
});

