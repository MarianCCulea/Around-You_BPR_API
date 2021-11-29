const { getListingsById } = require('../adaptor/adaptor');
const {Listing,Room} = require('../models');

module.exports = {
    async getAllListings() {
        try {
            const listing = await Listing.find().populate('room');
            return listing;
        } catch (err) {
            throw new Error(err.body);
        }
    },
    async getListingsById(id) {
        try {
            const listing= await Listing.findById(id).populate({path: 'room'}).lean();
            return listing;
        } catch (err) {
            throw new Error(err.body);
        }
    },
    async createListing(req) {
        try {
            const newListing = await Listing.create(req.body);
            return newListing;
        } catch (err) {
            console.log(err);
            throw new Error(err.body);
        }
    },
    async assignRoom(listingId,room) {
        try {
            const newRoom = await Room.create(room);
            const newListing = await Listing.findByIdAndUpdate(
                listingId,
                {
                    $push: { room: newRoom._id }
                },
                { new: true, useFindAndModify: false },
            );
        } catch (err) {
            throw new Error(err.body);
        }
    }
};