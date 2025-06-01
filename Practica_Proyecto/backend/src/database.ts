import 'reflect-metadata'
import DatabaseSingleton from './data-source';

export const initDatabase = async () => {
    try {
        const dataSource = await DatabaseSingleton.getInstance().initialize();
        return dataSource;
    } catch (error) {
        console.error("Error al inicializar la base de datos:", error);
        throw error;
    }
}