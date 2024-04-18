import express from 'express';

import planController from '../../src/controllers/planController.js';

const router = express.Router();

router
    .post("/create", planController.createPlan)
    .post("/search", planController.searchPlans)
    .post("/:id", planController.searchPlanInfo)

    
export default router;