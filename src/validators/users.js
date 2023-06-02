import validator from 'express-validator';
const { check } = validator;
import { validateResult } from '../helpers/validateHelper.js';

// Validate name, lastname, email, password, token, confirmed

const validateCreate = [
    check('name')
        .exists()
        .notEmpty(),
    check('lastName')
        .exists()
        .notEmpty(),
    check('email')
        .exists()
        .notEmpty()
        .isEmail(),
    check('password')
        .exists()
        .notEmpty()
        .custom((value, { req }) => {
            if (value.length < 6) {
                throw new Error('El password debe tener al menos 6 caracteres');
            }
            return true;
        }),
    (req, res, next) => {
        validateResult(req, res, next);
    }
];

const validateLogin = [
    check('email')
        .exists()
        .notEmpty()
        .isEmail(),
    check('password')
        .exists()
        .notEmpty()
        .isLength({ min: 6 }),
    (req, res, next) => {
        validateResult(req, res, next);
    }
]

const validateEmail = [
    check('email')
        .exists()
        .notEmpty()
        .isEmail(),
    (req, res, next) => {
        validateResult(req, res, next);
    }
]

const validatePassword = [
    check('password')
        .exists()
        .notEmpty()
        .isLength({ min: 6 }),
    (req, res, next) => {
        validateResult(req, res, next);
    }
]

export {
    validateCreate,
    validateLogin,
    validateEmail,
    validatePassword
};