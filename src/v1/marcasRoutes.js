import express from 'express';

import marcasController from '../controllers/marcasController.js';

const router = express.Router();

router
    .get("/search/:cmarca", marcasController.searchMarcas)
    .post("/create", marcasController.createMarcas)
    .get("/get/:id", marcasController.searchMarca)
    .post("/edit/:id", marcasController.updateMarcas)
    
export default router;