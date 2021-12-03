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
            throw err;
        }
    },
    async updateRoom(roomID, room) {
        try {
            const newRoom = await Room.findByIdAndUpdate(roomID, room, { new: true });
            return newRoom;
        } catch (err) {
            throw err;
        }
    },
    async deleteRoom(roomID) {
        try {
            Room.deleteOne({ _id:roomID });
            return newRoom;
        } catch (err) {
            throw err;
        }
    },
    async getRoom(roomID) {
        try {
            const room = await Room.findById(roomID).lean();
            return room;
        } catch (err) {
            throw err;
        }
    },
    async updateRoomPanel(roomID,panel) {
        try {
            // const room = await Room.findById(roomID).lean();
            // return room;
        } catch (err) {
            throw err;
        }
    }
    
};