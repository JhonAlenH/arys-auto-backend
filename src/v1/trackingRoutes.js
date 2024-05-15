import express from 'express';

import trackingController from '../../src/controllers/trackingController.js';

const router = express.Router();

router

    .get("/search/:ccompania", trackingController.getAllTrackers)
    .get("/get/:id", trackingController.searchTrackerInfo)

export default router;