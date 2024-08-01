import express from 'express';

import contractsController from '../../src/controllers/contractsController.js';

const router = express.Router();

router

    .post("/search/:id", contractsController.searchContracts)
    .post("/searchByPage/:page/:records", contractsController.searchContractsByPage)
    .post("/search-propietary", contractsController.searchPropietary)
    .post("/vehicle", contractsController.searchVehicle)
    .post("/type-service", contractsController.typeServicePlan)
    .post("/create", contractsController.createMembership)
    .post("/detail", contractsController.detailMembership)
    .post("/searchReceipts/:ccontratoflota", contractsController.searchReceiptsByContract)

export default router;