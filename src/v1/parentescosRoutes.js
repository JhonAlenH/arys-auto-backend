import express from 'express';

import parentescosController from '../controllers/parentescosController.js';

const router = express.Router();

router
    .get("/search/:ccompania", parentescosController.searchParentescos)
    .post("/create", parentescosController.createParentescos)
    .get("/get/:id", parentescosController.searchParentesco)
    .post("/edit/:id", parentescosController.updateParentescos)
   
export default router;