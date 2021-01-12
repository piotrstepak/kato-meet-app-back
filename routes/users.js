import express from 'express';
import usersController from '../controllers/usersController.js';
import jwtAuth from "../middlewares/jwtAuth.js";

const router = express.Router();

router.get('/nextUserToDisplay', jwtAuth, usersController.nextUserToDisplay);

router.get('/matches', usersController.matches);

router.get('/', usersController.getAllUsers);

router.post('/add', usersController.add);

router.get('/:id', usersController.findById);

router.delete('/:id', usersController.deleteById);

router.put('/update/:id', usersController.updateUser);

export default router;
