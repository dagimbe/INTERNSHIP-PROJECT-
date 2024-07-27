const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const { getUserIdByToken } = require("../config/jwtprovider");

module.exports = {
    async createUser(userdata) {
        try {
            let { fullName, email, password, role } = userdata;
            const isUserExist = await User.findOne({ email: email });
            if (isUserExist) {
                throw new Error('User already exists with this email address');
            }
            password = await bcrypt.hash(password, 8);
            const user = await User.create({
                fullName,
                email,
                password,
                role
            });
            return user;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    
    async getUserByEmail(email) {
        try {
            const user = await User.findOne({ email: email });
            if (!user) {
                throw new Error('User not found');
            }
            return user;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    
    async findUserById(userId) {
        try {
            const user = await User.findById(userId);
            if (!user) {
                throw new Error('User not found with this ID');
            }
            return user;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    
    async findUserProfileByJwt(jwt) {
        try {
            const userId = getUserIdByToken(jwt);
            const user = await this.findUserById(userId);
            return user;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    
    async findAllUsers() {
        try {
            const users = await User.find();
            return users;
        } catch (error) {
            throw new Error(error.message);
        }
    }
};
