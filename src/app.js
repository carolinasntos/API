/*import express from 'express';
import { connect } from './db.js'; 
import usuariosRoutes from './routes/usuarios.routes.js'

const app = express();

// Conectar a la base de datos al iniciar el servidor
connect();

app.use(express.json());  // Middleware para manejar JSON en requests

app.use('/api',usuariosRoutes);

app.use((req,res) => {
    res.status(404).json({message: 'endpoint not found'});
});

export default app;*/

import express from 'express';
import { connect } from './db.js';
import usuariosRoutes from './routes/usuarios.routes.js';

const app = express();

// Conectar a la base de datos al iniciar el servidor
connect();

app.use(express.json());  // Middleware para manejar JSON en requests

// Configuración de rutas
app.use('/api', usuariosRoutes);

app.use((req, res) => {
    res.status(404).json({ message: 'endpoint not found' });
});

export default app;