import express from 'express';

import { getSensex } from '../controllers/sensexController.js';

const router = express.Router();
router.get('/', getSensex);

export default router;