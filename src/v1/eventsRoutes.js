import express from 'express';

import eventsController from '../../src/controllers/eventsController.js';

const router = express.Router();

router

    .post("/search/:ccompania/:cpais", eventsController.searchEvents)
    .post("/get/:id", eventsController.getEvent)
    .post("/getSeguimientosById/:id", eventsController.getSeguimientosById)
    .get("/getSeguimientos/:ccompania", eventsController.getSeguimientos)
    .post("/getSeguimientos/:ccompania", eventsController.getSeguimientos)
    .post("/create", eventsController.createEvents)
    .post("/getServiceOrderById/:id", eventsController.getServiceOrderById)
    .post("/getNotasById/:id", eventsController.getNotasById)
    .get("/getServiceOrder/:corden", eventsController.getServiceOrder)
    .post("/update", eventsController.updateEvents)
    .post("/getReplacementById/:id", eventsController.getReplacementById)
    .post("/getQuotesById/:id", eventsController.getQuotesById)

export default router;