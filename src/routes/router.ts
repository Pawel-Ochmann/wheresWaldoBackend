import express from 'express';
const controller = require('../controllers/index')

const router = express.Router();

router.get('/', controller.get);
router.get('/start', controller.start);
router.get('/stop', controller.stop);

export default router;
