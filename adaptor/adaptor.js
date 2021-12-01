const { listingController,roomController } = require('../controllers');

module.exports = {
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
            const query={is_active:false};
            await listingController.updateListing(req.body.listingID,query);
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
res.send(roomController.updateRoom(req.params.roomID,req.body));
        } catch (err) {
            next(err);
            console.error(err);
        }
    },
    async deleteRoom(req, res, next) {
        try {
            res.send(roomController.deleteRoom(req.body.roomID,req.body));
        } catch (err) {
            next(err);
            console.error(err);
        }
    },
    async getRoom(req, res, next) {
        try {
            
            req.params.roomID
        } catch (err) {
            next(err);
            console.error(err);
        }
    },
    async updatePanel(req, res, next) {
        try {
            
            req.params.roomID
        } catch (err) {
            next(err);
            console.error(err);
        }
    },
    async deletePanel(req, res, next) {
        try {
            
            req.params.roomID
        } catch (err) {
            next(err);
            console.error(err);
        }
    }
};