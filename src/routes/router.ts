import express from 'express';
const controller = require('../controllers/index')

const router = express.Router();

router.get('/', controller.get);
router.get('/start', controller.start);
router.post('/stop', controller.stop);

export default router;
