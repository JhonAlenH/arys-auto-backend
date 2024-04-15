import express from 'express';

import maestrosController from '../../src/controllers/maestrosController.js';

const router = express.Router();

router
    .post("/monedas", maestrosController.getMaMonedas)
    .post("/companias", maestrosController.getMaCompania)
    .post("/paises", maestrosController.getMaPais)
    .post("/metPago", maestrosController.getMaMetPago)
    .post("/servicios", maestrosController.getServicios)
    .post("/aseguradoras", maestrosController.getAseguradoras)
    
export default router;