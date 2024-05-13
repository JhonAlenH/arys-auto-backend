import express from 'express';

import serviciosController from '../../src/controllers/servicioController.js';

const router = express.Router();

router
    .get("/getTypeServices/:id", serviciosController.getTypeServices)
    .get("/getServicesByType/:id", serviciosController.getServicesByType)

    
export default router;