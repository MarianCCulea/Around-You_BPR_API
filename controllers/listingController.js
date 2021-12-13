const { Listing } = require('../models');

module.exports = {
    async createListing(listing) {
        try {
            const newListing = await Listing.create(listing);
            return newListing;
        } catch (err) {
            console.log(err);
            throw err;
        }
    },
    async updateListing(listingID,listing) {
        try {
            const newListing = await Listing.findByIdAndUpdate(listingID, listing, { new: true });
            return newListing;
        } catch (err) {
            console.log(err);
            throw err;
        }
    },
    async getAllListings() {
        try {
            const listing = await Listing.find().populate('room').limit();
            return listing;
        } catch (err) {
            throw err;
        }
    },
    async getLimitedListings(nr) {
        try {
            const listing = await Listing.find().skip(parseInt(nr, 10)).limit(5).populate('room').limit();
            return listing;
        } catch (err) {
            throw err;
        }
    },
    async getListingsById(id) {
        try {
            const listing = await Listing.findById(id).populate({ path: 'room' }).lean();
            return listing;
        } catch (err) {
            throw err;
        }
    },
    async getListingsByQuery(id) {
        try {
            
            const listing = await Listing.find({ 'room': { '_id': id } }).lean();
            return listing;
        } catch (err) {
            throw err;
        }
    }
};