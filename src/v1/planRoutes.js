import express from 'express';

import planController from '../../src/controllers/planController.js';

const router = express.Router();

router
    .post("/create", planController.createPlan)
    .get("/search", planController.searchPlans)
    .get("/:id", planController.searchPlanInfo)

    
export default router;