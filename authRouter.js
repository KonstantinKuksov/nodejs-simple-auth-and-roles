import Router from 'express';
import authController from './authController.js';
import {check} from "express-validator";
import authMiddleware from './middleware/authMiddlware.js';
import rolesMiddleware from './middleware/rolesMiddleware.js';

const router = new Router();

router.get('/users', authMiddleware, rolesMiddleware(['ADMIN']), authController.getUsers);
router.post('/registration', [
    check('username', 'username can\'t be empty').notEmpty(),
    check('password', 'password must be at least 4 characters').isLength({min: 4}),
], authController.registration);
router.post('/login', authController.login);

export default router;
