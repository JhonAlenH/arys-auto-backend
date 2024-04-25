import express from 'express';

import contractsController from '../../src/controllers/contractsController.js';

const router = express.Router();

router

    .post("/search", contractsController.searchContracts)
    .post("/search-propietary", contractsController.searchPropietary)
    .post("/vehicle", contractsController.searchVehicle)
    .post("/type-service", contractsController.typeServicePlan)
    .post("/create", contractsController.createMembership)

export default router;