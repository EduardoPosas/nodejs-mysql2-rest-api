import User from '../models/user.model.js';
import generateToken from '../helpers/tokenGenerator.js';
import { hashPasswordBcrypt, comparePasswordBcrypt } from '../helpers/passwordHash.js';
import emailVerification from '../helpers/emailVerification.js';
import emailNewPassword from '../helpers/emailNewPassword.js';
import generateJwt from '../helpers/jwtGenerator.js';

// User registration
const createUser = async (req, res) => {
    const { name, lastName, email, password } = req.body;
    try {
        const userExists = await User.findAll({
            where: {
                email
            }
        });
        if (userExists.length > 0) {
            return res.status(200).json({
                msg: 'Usuario ya registrado'
            });
        }

        let localUser = {
            name,
            lastName,
            email,
        };

        // Hash password 
        localUser.password = await hashPasswordBcrypt(password)
        localUser.token = generateToken();
        localUser.confirmed = 0;

        // send confirmation email
        emailVerification({ email, name, token: localUser.token });

        // Add user to db
        const createdUser = await User.create(localUser);

        return res.status(201).json({
            msg: 'Usuario creado con éxito',
            data: {
                name,
                lastName,
                email
            },
            id: createdUser.id
        });

    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
}

const confirmUser = async (req, res) => {
    const { token } = req.params

    try {
        const user = await User.findOne({
            where: {
                token
            }
        });
        if (!user) {
            return res.status(404).json({
                msg: 'No se puede verificar usuario'
            })
        }

        await User.update({
            token: null,
            confirmed: 1
        }, {
            where: {
                token
            }
        });

        return res.status(200).json({
            msg: 'Usuario confirmado con éxito'
        });

    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }

}

// Login
const login = async (req, res) => {
    const { email, password } = req.body;
    // query the user
    const user = await User.findOne({
        where: {
            email
        }
    });
    console.log(user);

    if (!user) {
        return res.status(404).json({
            msg: 'Usuario no existente en la base de datos'
        });
    }

    if (!user?.confirmed) {
        return res.status(403).json({
            msg: 'Usuario no confirmado'
        })
    }

    // Verifying passwords
    const isValidPassword = await comparePasswordBcrypt(password, user.password);
    console.log(isValidPassword);

    if (!isValidPassword) {
        return res.status(404).json({
            msg: 'Password incorrecto'
        });
    }

    // Authenticate and Authorization
    res.json({
        id: user.id,
        name: user.name,
        email: user.email,
        jwToken: generateJwt(user.id)
    });
}

// Forgot Password
const forgotPassword = async (req, res) => {

    // read email from request
    const { email } = req.body;


    try {
        // query user
        const user = await User.findOne({
            where: {
                email
            }
        });

        //check if user exists
        if (!user) {
            return res.status(403).json({
                msg: 'Usuario no existe. Verifica tu email'
            });
        }

        // if exists
        user.token = generateToken();
        console.log(user);

        // send email to verify changes
        emailNewPassword({ email, name: user.name, token: user.token });
        // Update new token
        await User.update({
            token: user.token
        }, {
            where: {
                email
            }
        });
        return res.json({
            msg: 'Hemos enviado un email con las instrucciones'
        });
    } catch (error) {
        return res.json({
            error: error.message
        });
    }
}

// Token verification
const tokenVerification = async (req, res) => {
    const { token } = req.params;

    
    try {
        // find user with token
        const tokenExists = await User.findOne({
            where: {
                token
            }
        });

        // User with token exists
        if(!tokenExists) {
            return res.json({
                msg: 'Token no válido'
            });
        }

        // if exists
        return res.json({
            msg: 'Token valido'
        });

    } catch (error) {
        return res.status(400).json({
            error: error.message
        });
    }
}

const changePassword = async (req, res) => {

    const { token } = req.params;
    const { password } = req.body;

    try {
        // Verify token exists
        const tokenExists = await User.findOne({
            where: {
                token
            }
        });

        if(!tokenExists) {
            return res.json({
                msg: 'Token no válido'
            });
        }

        // Delete token
        tokenExists.token = null;
        // Hash new password
        tokenExists.password = await hashPasswordBcrypt(password);
        console.log(tokenExists.password);

        //Update user
        await User.update({
            token: tokenExists.token,
            password: tokenExists.password
        },{
            where: {
                token
            }
        });

        return res.json({
            msg: 'Contraseña actualizada con éxito'
        });

    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
}


export {
    createUser,
    confirmUser,
    login,
    forgotPassword,
    tokenVerification,
    changePassword
};