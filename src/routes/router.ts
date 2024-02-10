import express from 'express';
const controller = require('../controllers/index')

const router = express.Router();

router.get('/start', controller.start);
router.post('/stop', controller.stop);
router.post('/games/:id/save', controller.save);
router.get('/games/records', controller.records);

export default router;
