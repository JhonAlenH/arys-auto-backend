import express from 'express';

import vehiculosController from '../controllers/vehiculosController.js';

const router = express.Router();

router
    .get("/search/:ccompania", vehiculosController.searchVehiculos)
    .get("/get/:id", vehiculosController.searchVehiculo)
    .post("/edit/:id", vehiculosController.updateVehiculos)
   
export default router;