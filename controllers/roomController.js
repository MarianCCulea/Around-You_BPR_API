const { Listing, Room } = require('../models');

module.exports = {
    async assignRoom(listingId, room) {
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
    },
    async updateRoom(listingId, room) {
        try {
        } catch (err) {
            throw new Error(err.body);
        }
    },
    async deleteRoom(listingId, room) {
        try {
        } catch (err) {
            throw new Error(err.body);
        }
    },
    async getRoom(listingId, room) {
        try {
        } catch (err) {
            throw new Error(err.body);
        }
    },
    async updatePanel(listingId, room) {
        try {
        } catch (err) {
            throw new Error(err.body);
        }
    },
    async deletePanel(listingId, room) {
        try {
        } catch (err) {
            throw new Error(err.body);
        }
    }
};