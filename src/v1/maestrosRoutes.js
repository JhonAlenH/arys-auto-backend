import express from 'express';

import maestrosController from '../../src/controllers/maestrosController.js';

const router = express.Router();

router
    .get("/monedas", maestrosController.getMaMonedas)
    .get("/companias", maestrosController.getMaCompania)
    .get("/paises", maestrosController.getMaPais)
    .get("/metPago", maestrosController.getMaMetPago)
    .get("/servicios", maestrosController.getServicios)
    .get("/aseguradoras", maestrosController.getAseguradoras)
    
export default router;