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
            //TODO:UPDATE
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
            const user= await User.findOne(query);
            return user;
        } catch (err) {
            throw err;
        }
    },
    async deleteUser(id) {
        try {
 //TODO:DELETE
        } catch (err) {
            throw err;
        }
    },
}