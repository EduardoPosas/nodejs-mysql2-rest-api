import { Router } from "express";
import {
    createUser,
    confirmUser,
    login,
    forgotPassword,
    tokenVerification,
    changePassword
} from "../controllers/users.controller.js";

import { validateCreate, validateLogin, validateEmail, validatePassword } from "../validators/users.js";

const router = Router();


// User registration and confirmation
router.post('/users', validateCreate, createUser);
router.get('/users/confirm/:token', confirmUser);

// Login
router.post('/users/login', validateLogin, login);

// Forgot Password
router.post('/users/forgot-password', validateEmail, forgotPassword);
router.route('/users/forgot-password/:token').get(tokenVerification).post(validatePassword, changePassword);


export default router;