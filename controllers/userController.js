const {User} = require('../models');

module.exports = {
     async createUser(user) {
        try {
            const newUser = await User.create(user);
            return newUser;
        } catch (err) {
            throw new Error(err.body);
        }
    },
    async updateUser(user) {
        try {
            //TODO:UPDATE
        } catch (err) {
            throw new Error(err.body);
        }
    },
    async getUserById(id) {
        try {
            const user= await User.findById(id).lean();
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
    },
    async deleteUser(id) {
        try {
 //TODO:DELETE
        } catch (err) {
            throw new Error(err.body);
        }
    },
}