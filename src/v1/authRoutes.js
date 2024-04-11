import express from 'express';

import authController from '../../src/controllers/authController.js';

const router = express.Router();

router

    .post("/signIn", authController.createJWT)
    .post("/user-modules", authController.getUserModules)

export default router;