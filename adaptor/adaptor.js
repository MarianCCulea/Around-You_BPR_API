const { listingController, roomController, userController, messageController } = require('../controllers');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const jwt = require('jsonwebtoken');

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

            await roomController.updateRoomPanel(req.params.roomID, req.body);
        } catch (err) {
            next(err);
            console.error(err);
        }
    },
    async deletePanel(req, res, next) {
        try {

            await roomController.updateRoomPanel(req.params.roomID, req.body);
        } catch (err) {
            next(err);
            console.error(err);
        }
    },
    //user routes
    async loginUser(req, res, next) {
        try {
            var userAccount = await userController.getUserByQuery({ username: req.body.username });
            if(!userAccount.is_active) res.send('Account is inactive');
            const validPass = await bcrypt.compare(req.body.password, userAccount.password);
            if (validPass) {
                //if is active!!!~
                //token
                const token = jwt.sign({ sub: userAccount._id, role: userAccount.role },
                     process.env.ACCESS_TOKEN_SECRET);
                delete userAccount.password;
                userAccount.token = token;
                res.send(userAccount);
            } else {
                res.send("Wrong username or password.")
            }
        } catch (err) {
            console.error(err);
        }
    },
    async createUser(req, res, next) {
        try {
            ///////////////////////////////revise
            var userAccount = await userController.getUserByQuery(req.body);
            if (userAccount == null) {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
                res.send(await userController.createUser(req.body));
            }
            else {
                res.send("Username is already taken");
            }
        } catch (err) {
            res.send(err);
        }
    },
    async updateUser(req, res, next) {
        try {
            const userAccount = await userController.getUserById(req.body._id);
            if(!userAccount.is_active) res.send('Account is inactive');
            const authHeader = req.headers['authorization'];
            const token = authHeader && authHeader.split(' ')[1];
            if (token == null) return res.sendStatus(401);
            jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,async (err,payload)=>{
                if(payload.sub==userAccount._id){
                    const newUser = await userController.updateUser(req.body);
                    res.send(newUser);
                }
                else res.send("Error");
            });
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
            const userAccount = await userController.getUserById(req.params.userID);
            const authHeader = req.headers['authorization'];
            const token = authHeader && authHeader.split(' ')[1];
            if (token == null) return res.sendStatus(401);
            jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,async (err,payload)=>{
                if(payload.sub==userAccount._id){
                    await userController.deleteUser(req.params.userID);
                    res.sendStatus(200);
                }
                else res.send("Error");
            });
        } catch (err) {
            throw new Error(err.body);
        }
    },
    //message routes
    async addMessage(req, res, next) {
        try {
            const user = await messageController.createMessage(req.params.agentName, req.body);
            res.send(user);
        } catch (err) {
            throw err;
        }
    },
    async getMessages(req, res, next) {
        try {
            const msg = await messageController.getAllMessages(req.params.userID);
            res.send(msg);
        } catch (err) {
            throw err;
        }
    }
};