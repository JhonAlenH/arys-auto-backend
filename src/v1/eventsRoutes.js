import express from 'express';

import eventsController from '../../src/controllers/eventsController.js';

const router = express.Router();

router

    .post("/search/:ccompania/:cpais", eventsController.searchEvents)
    .post("/get/:id", eventsController.getEvent)
    .post("/getSeguimientosById/:id", eventsController.getSeguimientosById)
    .get("/getSeguimientos/:ccompania", eventsController.getSeguimientos)
    .post("/create", eventsController.createEvents)

export default router;