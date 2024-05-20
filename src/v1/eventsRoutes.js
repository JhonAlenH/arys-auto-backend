import express from 'express';

import eventsController from '../../src/controllers/eventsController.js';

const router = express.Router();

router

    .post("/search/:ccompania/:cpais", eventsController.searchEvents)
    .post("/get/:id", eventsController.getEvent)
    .post("/getDetailed/:id", eventsController.getEventDetailed)
    .post("/create", eventsController.createEvents)

export default router;