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
    async getLimitedListings(page,itemPerPage) {
        try {
            const listing = await Listing.find({}, null, {sort: {createdAt: -1},skip:page * itemPerPage,limit:itemPerPage})   //find().skip(parseInt(nr, 10)).limit(5).populate('room').limit(); optional:skip(pageOptions.page * pageOptions.limit)
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
    async getListingsByRoomID(id) {
        try {
            const listing = await Listing.find({ 'room': { '_id': id } }).lean();
            return listing;
        } catch (err) {
            throw err;
        }
    },
    async getListingsByQuery(query) {
        try {
            const listing = await Listing.find(query,null,{sort: {createdAt: -1},limit:20}).lean();
            return listing;
        } catch (err) {
            throw err;
        }
    },
    async updateTraffic(listings,nr) {
        try {
            listings.forEach(async element => {
               await Listing.findByIdAndUpdate({_id: element._id}, { $inc: { trafficScore: nr }}, { new: true });
            });
        } catch (err) {
            throw err;
        }
    },
    async updateTrafficSingular(listingID,nr) {
        try {
               await Listing.findByIdAndUpdate({_id: listingID}, { $inc: { trafficScore: nr }}, { new: true });
              
        } catch (err) {
            throw err;
        }
    }
};