const { generateToken } = require("../config/jwtprovider");
const User = require("../models/user.model"); // No need for `.js` extension
const bcrypt = require('bcrypt');
const userService = require('../services/userService');

const register = async (req, res) => {
    try {
        const user = await userService.createUser(req.body);
        const jwt = generateToken(user._id); // Use _id, not _Id
        // await cartService.CreateCart(user); // Uncomment if you handle carts
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
        const jwt = generateToken(user._id); // Use _id, not _Id
        return res.status(200).send({ jwt, message: "Logged in successfully" });
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

module.exports = {
    register,
    login
}
