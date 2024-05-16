import express from 'express';

import propietariosController from '../controllers/propietariosController.js';

const router = express.Router();

router
    .get("/search/:ccompania", propietariosController.searchPropietarios)
    .get("/get/:id", propietariosController.searchPropietario)
    .post("/edit/:id", propietariosController.updatePropietarios)
    
export default router;