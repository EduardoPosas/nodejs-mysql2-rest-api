import jwt from "jsonwebtoken";

const generateJwt = id => {
    return jwt.sign({ id }, 'BAZSECRET', {
        expiresIn: "1d"
    });
}

export default generateJwt;