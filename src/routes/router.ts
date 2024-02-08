import express from 'express';
const controller = require('../controllers/index')

const router = express.Router();

router.get('/', controller.get);
router.get('/start', controller.start);
router.post('/stop', controller.stop);
router.post('/games/:id/save', controller.save);

export default router;
