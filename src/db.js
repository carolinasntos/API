import sql from 'mssql';
import {
    DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT
}from './config.js';

// Configuración de la conexión
const config = {
    user: DB_USER,               
    password: DB_PASSWORD,        
    server: DB_HOST,          
    database: DB_NAME,             
    port: DB_PORT,                  
    options: {
        encrypt: false,           
        trustServerCertificate: true  
    }
};

export const pool = new sql.ConnectionPool(config);

export const connect = async () => {
    try {
        await pool.connect();
        console.log('Conexión exitosa a SQL Server');
    } catch (err) {
        console.error('Error en la conexión:', err);
    }
};
