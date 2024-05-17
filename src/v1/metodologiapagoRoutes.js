import express from 'express';

import metodologiapagoController from '../controllers/metodologiapagoController.js';

const router = express.Router();

router
    .get("/search/:ccompania", metodologiapagoController.searchMetodologiapago)
    .post("/create", metodologiapagoController.createMetodologiapago)
    .get("/get/:id", metodologiapagoController.searchMetodologiapago1)
    .post("/edit/:id", metodologiapagoController.updateMetodologiapago)
    
export default router;