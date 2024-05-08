import express from 'express';

import menusController from '../controllers/menusController.js';

const router = express.Router();

router
    .get("/search/admin", menusController.getAdminMenus)
    .get("/search/club", menusController.getClubMenus)

    
export default router;