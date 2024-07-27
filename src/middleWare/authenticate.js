const { getUserIdByToken } = require("../config/jwtprovider");
const userService = require("../services/userService");

const authenticate = async (req, res, next) => {
    try {
        // Extract token from Authorization header
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ error: 'Token is missing' });
        }

        // Get userId from token
        const userId = getUserIdByToken(token);

        // Retrieve user from database
        const user = await userService.findUserById(userId);
        if (!user) {
            return res.status(401).json({ error: 'User not found' });
        }

        // Attach user to request object
        req.user = user;

        // Proceed to next middleware or route handler
        next();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = authenticate;
