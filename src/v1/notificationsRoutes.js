import express from 'express';

import notificationController from '../../src/controllers/notificationController.js';

const router = express.Router();

router

    .post("/getAll", notificationController.getNotifications)

export default router;