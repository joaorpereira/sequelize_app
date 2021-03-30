import express from 'express';
import UserController from '../controllers/UserController.js';

const router = express.Router();

router.get('/users', UserController.index);
router.post('/users', UserController.store);
router.post('/users/login', UserController.login);
router.put('/users/:user_id', UserController.update);
router.delete('/users/:user_id', UserController.delete);

export default router;
