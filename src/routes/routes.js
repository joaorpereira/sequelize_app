import express from 'express';
import AddressController from '../controllers/AddressController.js';
import UserController from '../controllers/UserController.js';

const router = express.Router();

router.get('/users', UserController.index);
router.post('/users', UserController.store);
router.post('/users/login', UserController.login);
router.put('/users/:user_id', UserController.update);
router.delete('/users/:user_id', UserController.delete);

router.get('/address/:user_id', AddressController.index);
router.post('/address/:user_id', AddressController.store);
router.put('/address/:user_id', AddressController.update);

export default router;
