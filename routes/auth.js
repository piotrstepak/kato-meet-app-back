import express from 'express';
import passport from 'passport';
import authController from "../controllers/authController.js";

const router = express.Router();

router.post('/login', passport.authenticate('local', { session: false }), authController.login);

router.post('/register', authController.register);

router.post('/registerMock', authController.registerMock);

export default router;
