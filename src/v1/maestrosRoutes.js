import express from 'express';

import maestrosController from '../../src/controllers/maestrosController.js';

const router = express.Router();

router
    .get("/monedas", maestrosController.getMaMonedas)
    .get("/moneda/:id", maestrosController.getMoneda)
    .get("/companias", maestrosController.getMaCompanias)
    .get("/compania/:id", maestrosController.getMaCompania)
    .get("/paises", maestrosController.getMaPaises)
    .get("/metPago", maestrosController.getMaMetsPago)
    .get("/servicios", maestrosController.getServicios)
    .get("/aseguradoras", maestrosController.getAseguradoras)
    .get("/ciudades/:estado/:pais", maestrosController.getMaCiudades)
    .get("/estados/:pais", maestrosController.getMaEstados)
    
export default router;