import express from 'express';

import paisesController from '../controllers/paisesController.js';

const router = express.Router();

router
    .get("/search", paisesController.searchPaises)
    .post("/create", paisesController.createPais)
    .get("/get/:id", paisesController.searchPais)
    .post("/edit/:id", paisesController.updatePais)
    // .post("/disable", monedasController.disableMonedas)

    
export default router;