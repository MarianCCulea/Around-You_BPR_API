const { listingController, roomController, userController } = require('../controllers');

module.exports = {
    //listing methods
    async createListing(req, res, next) {
        try {
            delete req.body.room;
            const oldListing = await listingController.createListing(req.body);
            res.send(await listingController.getListingsById(oldListing._id));
        } catch (err) {
            next(err);
            console.error(err);
        }
    },
    async updateListing(req, res, next) {
        try {
            res.send(await listingController.updateListing(req.body));
        } catch (err) {
            res.send(err);
        }
    },
    async deleteListing(req, res, next) {
        try {
            const query = { is_active: false };
            await listingController.updateListing(req.body.listingID, query);
        } catch (err) {
            next(err)
        }
    },
    async getAllListings(req, res, next) {
        try {
            res.send(listingController.getAllListings());
        } catch (err) {
            next(err);
        }
    },
    async getListingsById(req, res, next) {
        try {
            res.send(await listingController.getListingsById(req.params.listingID));
        } catch (err) {
            next(err);
        }
    },
    //room methods
    async assignRoom(req, res, next) {
        try {
            req.body.photo = req.file.path;
            await roomController.assignRoom(req.body.listingID, req.body);
            res.send(await listingController.getListingsById(req.body.listingID));
        } catch (err) {
            next(err);
            console.error(err);
        }
    },
    async updateRoom(req, res, next) {
        try {
            res.send(roomController.updateRoom(req.params.roomID, req.body));
        } catch (err) {
            next(err);
            console.error(err);
        }
    },
    async deleteRoom(req, res, next) {
        try {
            res.send(roomController.deleteRoom(req.body.roomID, req.body));
        } catch (err) {
            next(err);
            console.error(err);
        }
    },
    async getRoom(req, res, next) {
        try {

          res.send(await roomController.getRoom(req.params.roomID));
        } catch (err) {
            next(err);
            console.error(err);
        }
    },
    async updatePanel(req, res, next) {
        try {

            await roomController.updateRoomPanel(req.params.roomID,req.body);
        } catch (err) {
            next(err);
            console.error(err);
        }
    },
    async deletePanel(req, res, next) {
        try {

            await roomController.updateRoomPanel(req.params.roomID,req.body);
        } catch (err) {
            next(err);
            console.error(err);
        }
    },
    //user routes
    async loginUser(req, res, next) {
        try {
            var userAccount = await userController.getUserByQuery(req.body);
            if (userAccount != null) {
                    res.send(userAccount);
            }else{
                res.send("Wrong username or password.")
            }
        } catch (err) {
            throw new Error(err.body);
        }
    },
    async createUser(req, res, next) {
        try {
            var userAccount = await userController.getUserByQuery(req.body);
            if (userAccount == null) {
                console.log("Create new account..")
                res.send(await userController.createUser(req.body));
            }
            else {
                res.send("Username is already taken");
            }
        } catch (err) {
            console.log(err.body);
           res.send(err);
        }
    },
    async updateUser(req, res, next) {
        try {
            const user = await userController.updateUser(req.body);
            return user;
        } catch (err) {
            throw new Error(err.body);
        }
    },
    async getUserById(req, res, next) {
        try {
            const user = await userController.getUserById(req.params.userID);
            res.send(user);
        } catch (err) {
            throw new Error(err.body);
        }
    },
    async deleteUser(req, res, next) {
        try {
            const user = await userController.deleteUser(req.params.userID);
            return user;
        } catch (err) {
            throw new Error(err.body);
        }
    },

};