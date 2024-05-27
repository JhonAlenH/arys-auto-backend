import express from 'express';

import bancosController from '../controllers/bancosController.js';

const router = express.Router();

router
    .get("/search/:cbanco", bancosController.searchBancos)
    .post("/create", bancosController.createBancos)
    .get("/get/:id", bancosController.searchBanco)
    .post("/edit/:id", bancosController.updateBancos)
    .get("/getBancos/:cpais", bancosController.searchBancosMaestros)
    // .post("/disable", monedasController.disableMonedas)

    
export default router;