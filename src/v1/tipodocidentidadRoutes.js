import express from 'express';

import tipodocidentidadController from '../controllers/tipodocidentidadController.js';

const router = express.Router();

router
    .get("/search/:ccompania", tipodocidentidadController.searchTipodocidentidad)
    .post("/create", tipodocidentidadController.createTipodocidentidad)
    .get("/get/:id", tipodocidentidadController.searchTipodocidentidad1)
    .post("/edit/:id", tipodocidentidadController.updateTipodocidentidad)
   
export default router;