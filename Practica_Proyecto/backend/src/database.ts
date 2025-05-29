import { appdataSource } from './data-source'
import 'reflect-metadata'

export const initDatabase = async () => {
    try {
        const dataSource = await appdataSource.initialize();
        return dataSource;
    } catch (error) {
        console.error("Error al inicializar la base de datos:", error);
        throw error;
    }
}