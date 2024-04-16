import express from 'express';

import contractsController from '../../src/controllers/contractsController.js';

const router = express.Router();

router

    .post("/search", contractsController.searchContracts)

export default router;