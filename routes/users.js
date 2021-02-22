import express from 'express';
import usersController from '../controllers/usersController.js';
import jwtAuth from "../middlewares/jwtAuth.js";

//add admin panel

const router = express.Router();

router.post('/nextUserToDisplay', jwtAuth, usersController.nextUserToDisplay);

router.post('/matches', jwtAuth, usersController.matches);

router.get('/', usersController.getAllUsers);

router.post('/add', usersController.add);

router.get('/:id', usersController.findById);

router.delete('/:id', usersController.deleteById);

router.put('/update/:id', usersController.updateUser);

export default router;
