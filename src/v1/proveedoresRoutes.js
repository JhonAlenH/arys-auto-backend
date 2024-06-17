import express from 'express';

import proveedoresController from '../controllers/proveedoresController.js';

const router = express.Router();

router
    .get("/search/:ccompania", proveedoresController.searchProveedores)
    .post("/create", proveedoresController.createProveedores)
    .get("/get/:id", proveedoresController.searchProveedor)
    .post("/edit/:id", proveedoresController.updateProveedores)
    
export default router;