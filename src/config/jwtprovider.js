require('dotenv').config();
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY;

const generateToken = (userId) => {
    const token = jwt.sign({ userId: userId }, SECRET_KEY, { expiresIn: '24h' });
    return token;
}

const getUserIdByToken = (token) => {
    try {
        const decodedToken = jwt.verify(token, SECRET_KEY);
        return decodedToken.userId;
    } catch (error) {
        throw new Error('Invalid or expired token');
    }
}

module.exports = {
    generateToken,
    getUserIdByToken
};
