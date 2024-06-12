import express from 'express';

import companiasController from '../controllers/companiasController.js';

const router = express.Router();

router
    .get("/search/:ccompania", companiasController.searchCompanias)
    .post("/create", companiasController.createCompanias)
    .get("/get/:id", companiasController.searchCompania)
    .post("/edit/:id", companiasController.updateCompanias)
    
export default router;