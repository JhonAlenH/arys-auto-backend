import express from 'express';

import orderController from '../../src/controllers/orderController.js';

const router = express.Router();

router
    .get("/search", orderController.getOrders)
    .get("/:id", orderController.getDetailedOrder)
    .get("/getOrdersByUser/:cusuario", orderController.getOrdersByUser)

    
export default router;