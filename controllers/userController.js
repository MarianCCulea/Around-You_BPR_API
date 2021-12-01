const {User} = require('../models');

module.exports = {
    async loginUser() {
        try {
            const user = await User.find().populate('user');
            return user;
        } catch (err) {
            throw new Error(err.body);
        }
    },
    async createUser(user) {
        try {
            const newUser = await User.create(user);
            return newUser;
        } catch (err) {
            throw new Error(err.body);
        }
    },
    async updateUser() {
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
    async getUserByQuery(query) {
        try {
            const user= await User.findOne(query);
            return user;
        } catch (err) {
            throw new Error(err.body);
        }
    }
}