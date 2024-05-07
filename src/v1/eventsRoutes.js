import express from 'express';

import eventsController from '../../src/controllers/eventsController.js';

const router = express.Router();

router

    .post("/search", eventsController.searchEvents)

export default router;