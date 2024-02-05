import express from 'express';
const controller = require('../controllers/index')

const router = express.Router();

router.get('/', controller.get);

export default router;
