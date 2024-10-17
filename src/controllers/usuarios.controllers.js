/*import sql from 'mssql';
import { pool } from '../db.js';
//Hola

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
};*/

import { pool } from '../db.js';

// Obtener todos los usuarios
export const getUsuarios = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM usuario');
    res.json(result.rows);  // En PostgreSQL, los resultados están en `rows`
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).send('Hubo un error al obtener los usuarios');
  }
};

// Obtener un usuario por ID
export const getUsuarioById = async (req, res) => {
  try {
    const { idUsuario } = req.params;

    if (isNaN(idUsuario)) {
      return res.status(400).json({ message: 'ID de usuario inválido' });
    }

    const result = await pool.query('SELECT * FROM usuario WHERE idusuario = $1', [idUsuario]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al obtener el usuario:', error);
    res.status(500).json({
      message: 'Hubo un error al obtener el usuario',
      error: error.message,
      stack: error.stack,
    });
  }
};

// Crear un nuevo usuario (POST)
export const createUsuarios = async (req, res) => {
    try {
      const { nombre, apellido, email, contraseña } = req.body;  // Extraemos los datos del body
  
      // Validar que todos los campos requeridos estén presentes
      if (!nombre || !apellido || !email || !contraseña) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
      }
  
      // Insertar un nuevo usuario en la base de datos
      const result = await pool.query(
        'INSERT INTO usuario (nombre, apellido, email, contraseña) VALUES ($1, $2, $3, $4) RETURNING idusuario',
        [nombre, apellido, email, contraseña]
      );
  
      const newUser = result.rows[0];  // El nuevo usuario creado
  
      res.status(201).json({
        message: 'Usuario creado exitosamente',
        usuario: {
          id: newUser.idusuario,
          nombre,
          apellido,
          email,
          contraseña
        }
      });
    } catch (error) {
      console.error('Error al crear usuario:', error);
      res.status(500).json({
        message: 'Hubo un error al crear el usuario',
        error: error.message,
        stack: error.stack,
      });
    }
};

// Actualizar un usuario
export const updateUsuarios = async (req, res) => {
  try {
    const { idUsuario } = req.params;
    const { nombre, apellido, email, contraseña } = req.body;

    if (!nombre || !apellido || !email || !contraseña) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    const result = await pool.query(
      'UPDATE usuario SET nombre = $1, apellido = $2, email = $3, contraseña = $4 WHERE idusuario = $5',
      [nombre, apellido, email, contraseña, idUsuario]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json({ message: 'Usuario actualizado correctamente' });
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
    res.status(500).json({ message: 'Hubo un error al actualizar el usuario' });
  }
};

// Eliminar un usuario
export const deleteUsuarios = async (req, res) => {
  try {
    const { idUsuario } = req.params;

    if (isNaN(idUsuario)) {
      return res.status(400).json({ message: 'ID de usuario inválido' });
    }

    const result = await pool.query('DELETE FROM usuario WHERE idusuario = $1', [idUsuario]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json({ message: `Usuario con id ${idUsuario} eliminado correctamente` });
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    res.status(500).json({ message: 'Hubo un error al eliminar el usuario' });
  }
};