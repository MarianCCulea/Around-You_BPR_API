const {User} = require('../models');

module.exports = {
    async getAllUsers() {
        try {
            const user = await User.find().populate('user');
            return user;
        } catch (err) {
            throw new Error(err.body);
        }
    },
    async getUserById(id) {
        try {
            const user= await User.findById(id).populate({path: 'user'}).lean();
            return user;
        } catch (err) {
            throw new Error(err.body);
        }
    },

    async createUser(req) {
        try {
            const newUser = await User.create(req.body);
            return newUser;
        } catch (err) {
            console.log(err);
            throw new Error(err.body);
        }
    },
}