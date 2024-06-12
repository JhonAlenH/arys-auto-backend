import express from 'express';

import monedasController from '../../src/controllers/monedasController.js';

const router = express.Router();

router
    .post("/create", monedasController.createMoneda)
    .post("/edit/:id", monedasController.editMoneda)
    // .post("/disable", monedasController.disableMonedas)

    
export default router;