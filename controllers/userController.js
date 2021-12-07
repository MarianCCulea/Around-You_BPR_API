const {User} = require('../models');

module.exports = {
     async createUser(user) {
        try {
            const newUser = await User.create(user);
            return newUser;
        } catch (err) {
            throw err;
        }
    },
    async updateUser(user) {
        try {
            const newUser = await User.findByIdAndUpdate(user._id, user, { new: true });
            return newUser;
        } catch (err) {
            throw err;
        }
    },
    async getUserById(id) {
        try {
            const user= await User.findById(id).lean();
            return user;
        } catch (err) {
            throw err;
        }
    },
    async getUserByQuery(query) {
        try {
            const user= await User.findOne(query).lean();
            return user;
        } catch (err) {
            throw err;
        }
    },
    async deleteUser(id) {
        try {
            const newUser = await User.findByIdAndUpdate(id, {is_active:false}, { new: true });
            return newUser;
        } catch (err) {
            throw err;
        }
    },
}