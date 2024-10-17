import {Router} from 'express';
import {getUsuarios} from '../controllers/usuarios.controllers.js';
import {getUsuarioById} from '../controllers/usuarios.controllers.js';
import {createUsuarios} from '../controllers/usuarios.controllers.js';
import {updateUsuarios} from '../controllers/usuarios.controllers.js';
import {deleteUsuarios} from '../controllers/usuarios.controllers.js';

const router = Router()

// Endpoints de usuarios
router.get('/usuarios', getUsuarios);

router.get('/usuarios/:idUsuario', getUsuarioById);

router.post('/usuarios', createUsuarios);

router.put('/usuarios/:idUsuario', updateUsuarios);

router.delete('/usuarios/:idUsuario', deleteUsuarios);

export default router