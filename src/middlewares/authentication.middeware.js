import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

const checkAuthentication = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, 'BAZSECRET');

            const user = await User.findOne(
                {
                    attributes: ['id']
                },
                {
                    where: {
                        id: decoded.id
                    }
                }
            );

            console.log(user.id);

            req.user = user;

            return next();
        } catch (error) {
            return res.status(403).json({
                error: error.message
            })
        }
    }

    if (!token) {
        return res.status(403).json({
            msg: 'Token no válido o inexistente'
        });
    }
};

export default checkAuthentication;

