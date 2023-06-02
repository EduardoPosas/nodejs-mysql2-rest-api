import bcrypt from 'bcrypt';

const hashPasswordBcrypt = password => {
    return bcrypt.hash(password, 10);
}

const comparePasswordBcrypt = (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
} 

export {
    hashPasswordBcrypt,
    comparePasswordBcrypt
};