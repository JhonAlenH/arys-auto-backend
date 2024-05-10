import express from 'express';

import metodologiapagoController from '../controllers/metodologiapagoController.js';

const router = express.Router();

router
    .get("/search", metodologiapagoController.searchMetodopago)
    .post("/create", metodologiapagoController.createMetodopago)
    .get("/get/:id", metodologiapagoController.searchMetodopago)
    .post("/edit/:id", metodologiapagoController.updateMetodopago)
    // .post("/disable", metodologiapagoController.disableMetodopago)

    
export default router;