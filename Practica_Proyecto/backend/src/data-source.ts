import 'reflect-metadata';
import { DataSource } from "typeorm";
import { Curso } from "./models/Curso";
import { Estudiante } from "./models/Estudiantes";

class DatabaseSingleton {
    private static instance: DatabaseSingleton;
    private dataSource: DataSource;
    private initialized: boolean = false;

    private constructor() {
        this.dataSource = new DataSource({
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
    }

    public static getInstance(): DatabaseSingleton {
        if (!DatabaseSingleton.instance) {
            DatabaseSingleton.instance = new DatabaseSingleton();
        }
        return DatabaseSingleton.instance;
    }

    public async initialize(): Promise<DataSource> {
        if (!this.initialized) {
            try {
                await this.dataSource.initialize();
                this.initialized = true;
                console.log("Base de datos inicializada correctamente");
            } catch (error) {
                console.error("Error al inicializar la base de datos:", error);
                throw error;
            }
        }
        return this.dataSource;
    }

    public getDataSource(): DataSource {
        return this.dataSource;
    }

    public isInitialized(): boolean {
        return this.initialized;
    }
}

// Mantener la compatibilidad con el código existente
export const appdataSource = DatabaseSingleton.getInstance().getDataSource();
