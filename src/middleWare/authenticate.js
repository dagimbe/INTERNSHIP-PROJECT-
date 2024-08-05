const { getUserIdByToken } = require("../config/jwtprovider");
const userService = require("../services/userService");

const authenticate = (requiredRole = null) => {
    return async (req, res, next) => {
        try {
           
            const token = req.headers.authorization?.split(' ')[1];
            if (!token) {
                return res.status(401).json({ error: 'Token is missing' });
            }

          
            const userId = getUserIdByToken(token);

            const user = await userService.findUserById(userId);
            if (!user) {
                return res.status(401).json({ error: 'User not found' });
            }

            req.user = user;

          
            if (requiredRole && req.user.role !== requiredRole) {
                return res.status(403).json({ error: 'Access denied' });
            }
            next();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };
};

module.exports = authenticate;
