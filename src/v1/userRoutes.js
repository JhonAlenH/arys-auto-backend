import express from 'express';

import userController from '../../src/controllers/userController.js';

const router = express.Router();

router

    .get("/club/getUser/:id", userController.getUserInfo)
    .get("/getCarInfo/:inma", userController.getINMAInfo)

export default router;