import express from 'express';

import estadocivilController from '../controllers/estadocivilController.js';

const router = express.Router();

router
    .get("/search/:ccompania", estadocivilController.searchEstadocivil)
    .post("/create", estadocivilController.createEstadocivil)
    .get("/get/:id", estadocivilController.searchEstadocivil1)
    .post("/edit/:id", estadocivilController.updateEstadocivil)
   
export default router;