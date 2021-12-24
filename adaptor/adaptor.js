const { listingController, roomController, userController, messageController } = require('../controllers');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const geocoder=require('../utils/geocoder')

module.exports = {
    //listing methods
    async createListing(req, res, next) {
        try {
            var code=req.body.street+" "+ req.body.house_no+", "+req.body.city;
            console.log(code);
            const loc = await geocoder.geocode(code);
  const location = {
    type: 'Point',
    coordinates: [loc[0].longitude, loc[0].latitude]
  };
  req.body['location']=location;

            req.body.thumbnail = req.file.path;
            const authHeader = req.headers['authorization'];
            const token = authHeader && authHeader.split(' ')[1];
            if (token == null) return res.sendStatus(401);
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, payload) => {
                req.body['agentID'] = payload.sub;
            });
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
            const listing = await listingController.getListingsById(req.body._id);
            const authHeader = req.headers['authorization'];
            const token = authHeader && authHeader.split(' ')[1];
            if (token == null) return res.sendStatus(401);
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, payload) => {
                if (payload.sub == listing.agentID) {
                    res.send(await listingController.updateListing(req.body));
                }
                else res.send("Not authorized to update this listing");
            });
        } catch (err) {
            res.send(err);
        }
    },
    async uploadListingPhoto(req, res, next) {
        try {
            const listing = await listingController.getListingsById(req.params.listingID);
            const authHeader = req.headers['authorization'];
            const token = authHeader && authHeader.split(' ')[1];
            if (token == null) return res.sendStatus(401);
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, payload) => {
                if (payload.sub == listing.agentID) {
                    res.send(await listingController.updateListing({ thumbnail: req.file.path }));
                }
                else res.send("Not authorized to update this listing");
            });
        } catch (err) {
            res.send(err);
        }
    },
    async deleteListing(req, res, next) {
        try {
            const query = { is_active: false };
            await listingController.updateListing(req.params.listingID, query);
        } catch (err) {
            next(err)
        }
    },
    async getAllListings(req, res, next) {
        try {
            res.send(await listingController.getAllListings());
        } catch (err) {
            next(err);
        }
    },
    async getLimitedListings(req, res, next) {
        try {
            let listings=await listingController.getLimitedListings(req.params.page,req.parans.itemPerPage)
            res.send(listings);
           // listingController.updateTraffic(listings,1);
            
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
    async listingSearch(req, res, next) {
        try {
            let priceQuery={};
            let propertySizeQuery={};
            let groundSizeQuery={};
            let yearQuery={};
            let typeQuery={};
            let postalQuery={};
            if(req.body.hasOwnProperty('minPrice')&&req.body.hasOwnProperty('maxPrice')){
                priceQuery={
                    $and: [ { price: { $gte: req.body.minPrice } }, { price: { $lte: req.body.maxPrice } }]
                                 };
            }
            
            if(req.body.hasOwnProperty('living_space')){
                propertySizeQuery={
                    $and: [ { living_space: { $gte: req.body.living_space-req.body.living_space*0.45 } },
                         { living_space: { $lte: req.body.living_space+req.body.living_space*0.45 } }]
                                 };
            }

            if(req.body.hasOwnProperty('ground_size')){
                groundSizeQuery={
                    $and: [ { ground_size: { $gte: req.body.ground_size-req.body.ground_size*0.4 } },
                         { ground_size: { $lte: req.body.ground_size+req.body.ground_size*0.4 } }]
                                 };
            }

            if(req.body.hasOwnProperty('year_of_construction')){
                yearQuery={
                    $and: [ { year_of_construction: { $gte: req.body.year_of_construction-20 } },
                         { year_of_construction: { $lte: req.body.year_of_construction+20 } }]
                                 };
            }

            if(req.body.hasOwnProperty('property_type')){
                typeQuery= { property_type: req.body.property_type};
            }

            if(req.body.hasOwnProperty('postal_code')){
                postalQuery={
                    $and: [ { postal_code: { $gte: req.body.postal_code-req.body.postal_code*0.2 } },
                         { postal_code: { $lte: req.body.postal_code+req.body.postal_code*0.2 } }]
                                 };
            }

            let query={$and:[priceQuery,propertySizeQuery,groundSizeQuery,yearQuery,typeQuery,postalQuery]};
            let listings=await listingController.getListingsByQuery(query)
            res.send(listings);
            listingController.updateTraffic(listings,2);
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
    async incrementTraffic(req, res, next) {
        try {
            await listingController.updateTrafficSingular(req.body.listingID,3);
            res.sendStatus(200);
        } catch (err) {
            next(err);
        }
    },
    //room methods
    async assignRoom(req, res, next) {
        try {
            const listing = await listingController.getListingsById(req.params.listingID);
            const authHeader = req.headers['authorization'];
            const token = authHeader && authHeader.split(' ')[1];
            if (token == null) return res.sendStatus(401);
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, payload) => {
                if (payload.sub == listing.agentID) {
                    req.body.photo = req.file.path;
                    await roomController.assignRoom(req.body.listingID, req.body);
                    res.send(await listingController.getListingsById(req.body.listingID));
                }
                else res.send("Not authorized to update this listing");
            });
        } catch (err) {
            next(err);
            console.error(err);
        }
    },
    async updateRoom(req, res, next) {
        try {
            const listing = await listingController.getListingsByRoomID(req.body.roomID);
            const authHeader = req.headers['authorization'];
            const token = authHeader && authHeader.split(' ')[1];
            if (token == null) return res.sendStatus(401);
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, payload) => {
                if (payload.sub == listing.agentID) {
                    const newRoom = await roomController.updateRoom(req.body._id, req.body)
                    res.send(newRoom);
                }
                else res.send("Not authorized to update this listing");
            });
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
    async getRooms(req, res, next) {
        try {
            const listing = await listingController.getListingsById(req.params.listingID)
            res.send(listing.room);
        } catch (err) {
            next(err);
            console.error(err);
        }
    },
    //user routes
    async loginUser(req, res, next) {
        try {
            var userAccount = await userController.getUserByQuery({ username: req.body.username });
            if (!userAccount) return res.sendStatus(401);
            if (!userAccount.is_active) res.send('Account is inactive');
            const validPass = await bcrypt.compare(req.body.password, userAccount.password);
            if (validPass) {
                //if is active!!!~
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
            var userAccount = await userController.getUserByQuery({ username: req.body.username });
            if (userAccount == null) {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
                req.body.profile_image = req.file.path;
                const acc = await userController.createUser(req.body)
                res.send(acc);
            }
            else {
                res.sendStatus(402).send("Username is already taken");
            }
        } catch (err) {
            res.sendStatus(401).send(err);
        }
    },
    async createAgent(req, res, next) {
        try {
            var userAccount = await userController.getUserByQuery({ username: req.body.username });
            if (userAccount == null) {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
                req.body.profile_image = req.file.path;
                req.body['role'] = 'Agent';
                const acc = await userController.createUser(req.body)
                res.send(acc);
            }
            else {
                res.sendStatus(402).send("Username is already taken");
            }
        } catch (err) {
            res.sendStatus(401).send(err);
        }
    },
    async updateUser(req, res, next) {
        try {
            const userAccount = await userController.getUserById(req.body._id);
            if (!userAccount.is_active) res.send('Account is inactive');
            const authHeader = req.headers['authorization'];
            const token = authHeader && authHeader.split(' ')[1];
            if (token == null) return res.sendStatus(401);
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, payload) => {
                if (payload.sub == userAccount._id) {
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
    async getPublicUser(req, res, next) {
        try {
            const user = await userController.getUserById(req.params.userID);
            delete user.password;
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
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, payload) => {
                if (payload.sub == userAccount._id) {
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

            const authHeader = req.headers['authorization'];
            const token = authHeader && authHeader.split(' ')[1];
            if (token == null) return res.sendStatus(401);
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, payload) => {
                const userAccount = await userController.getUserById(payload.sub);
                req.body['sender_ID'] = payload.sub;
                req.body['sender_name'] = userAccout.username;
            })
            const msg = await messageController.createMessage(req.params.agentID, req.body);
            res.send(user);
        } catch (err) {
            throw err;
        }
    },
    async getMessages(req, res, next) {
        try {
            const authHeader = req.headers['authorization'];
            const token = authHeader && authHeader.split(' ')[1];
            if (token == null) return res.sendStatus(401);
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, payload) => {
                if (payload.sub == req.params.agentID) {
                    const msg = await messageController.getAllMessages(req.params.agentID);
                    res.send(msg);
                }
                else {
                    res.sendStatus(401).send("Not authorized");
                }
            })
        } catch (err) {
            throw err;
        }
    }
};