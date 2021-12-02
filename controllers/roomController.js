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
    async updateRoom(roomID, room) {
        try {
            const newRoom = await Room.findByIdAndUpdate(roomID, room, { new: true });
            return newRoom;
        } catch (err) {
            throw new Error(err.body);
        }
    },
    async deleteRoom(roomID, room) {
        try {
            const newRoom = await Room.findByIdAndUpdate(roomID, room, { new: true });
            return newRoom;
        } catch (err) {
            throw new Error(err.body);
        }
    },
    async getRoom(roomID) {
        try {
            const room = await Room.findById(roomID).lean();
            return room;
        } catch (err) {
            throw new Error(err.body);
        }
    },
    async updateRoomPanel(roomID,panel) {
        try {
            // const room = await Room.findById(roomID).lean();
            // return room;
        } catch (err) {
            throw new Error(err.body);
        }
    }
    
};