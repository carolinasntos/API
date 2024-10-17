import sql from 'mssql';
import { pool } from '../db.js';

export const getUsuarios = async (req, res) => {
    try {
        const result = await pool.request()
            .query('SELECT * FROM Usuario'); 

        const usuarios = result.recordset; 

        res.json(usuarios); 
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).send('Hubo un error al obtener los usuarios');
    }
};

export const getUsuarioById = async (req, res) => {
    try {
        const { idUsuario } = req.params;

        if (isNaN(idUsuario)) {
            return res.status(400).json({ message: 'ID de usuario inválido' });
        }

        // Ejecutar la consulta SQL
        const result = await pool
            .request()
            .input('idUsuario', sql.Int, idUsuario)
            .query('SELECT * FROM Usuario WHERE idUsuario = @idUsuario');

        if (result.recordset.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.json(result.recordset[0]);
    } catch (error) {
        console.error('Error al obtener el usuario:', error);
        res.status(500).json({
            message: 'Hubo un error al obtener el usuario',
            error: error.message,
            stack: error.stack, 
        });
    }
};

export const createUsuarios = async (req, res) => {
    try {
        const { nombre, email, password, edad } = req.body;

        const result = await pool.request()
            .input('nombre', nombre)
            .input('email', email)
            .input('password', password)
            .input('edad', edad)
            .query('INSERT INTO Usuario (nombre, email, password, edad) OUTPUT INSERTED.idUsuario VALUES (@nombre, @email, @password, @edad)');

        const newUser = result.recordset[0]; 

        res.send({
            id: newUser.idUsuario,
            nombre,
            email,
            password,
            edad
        });
    } catch (error) {
        console.error('Error al crear usuario:', error);
        res.status(500).send('Hubo un error al crear el usuario');
    }
};


export const updateUsuarios = async (req, res) => {
    try {
        const { idUsuario } = req.params;
        const { nombre, email, password, edad } = req.body;

        // Validar que los parámetros sean correctos
        if (!nombre || !email || !password || !edad) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }

        const result = await pool
            .request()
            .input('idUsuario', sql.Int, idUsuario)
            .input('nombre', sql.VarChar, nombre)
            .input('email', sql.VarChar, email)
            .input('password', sql.VarChar, password)
            .input('edad', sql.Int, edad)
            .query(
                'UPDATE Usuario SET nombre = @nombre, email = @email, password = @password, edad = @edad WHERE idUsuario = @idUsuario'
            );

        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.json({ message: 'Usuario actualizado correctamente' });
    } catch (error) {
        console.error('Error al actualizar el usuario:', error);
        res.status(500).json({ message: 'Hubo un error al actualizar el usuario' });
    }
};

export const deleteUsuarios = async (req, res) => {
    try {
        const { idUsuario } = req.params;

    
        if (isNaN(idUsuario)) {
            return res.status(400).json({ message: 'ID de usuario inválido' });
        }

       
        const result = await pool
            .request()
            .input('idUsuario', sql.Int, idUsuario)
            .query('DELETE FROM Usuario WHERE idUsuario = @idUsuario');

        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.json({ message: `Usuario con id ${idUsuario} eliminado correctamente` });
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        res.status(500).json({ message: 'Hubo un error al eliminar el usuario' });
    }
};