const { generateToken } = require("../config/jwtprovider");
const userService = require('../services/userService');
const bcrypt = require('bcrypt');

const register = async (req, res) => {
    try {
    
        const user = await userService.createUser(req.body);

        const jwt = generateToken(user._id); 

        return res.status(201).send({ jwt, message: "Registered successfully", user });
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

const login = async (req, res) => {
    const { password, email } = req.body;
    try {
        const user = await userService.getUserByEmail(email);
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).send({ message: "Invalid password" });
        }
        const jwt = generateToken(user._id); 
        return res.status(200).send({ jwt, message: "Logged in successfully" });
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

const logout = (req, res) => {
    return res.status(200).send({ message: "Logged out successfully" });
}

module.exports = {
    register,
    login,
    logout
}
