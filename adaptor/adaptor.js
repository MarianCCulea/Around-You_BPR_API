const {listingController} = require('../controllers');

module.exports = {
    async createListing(req, res,next) {
        try {
            const rooms=req.body.room;
            delete req.body.room;
            const oldListing=await listingController.createListing(req);

            for (let i = 0; i < rooms.length; i++) {
                listingController.assignRoom(oldListing._id,rooms[i]);
              }
            res.send(await listingController.getListingsById(oldListing._id));
        } catch (err) {
            next(err);
            console.error(err);
        }
    },
    async uploadFiles(res,req,next){
        
    },
    async getListingsById(req,res,next){
        try{
            res.send(await listingController.getListingsById(req.body._id));
        }catch (err) {
            next(err);
        }
    },

    async getAllListings(req,res,next){
        try{
            res.send(listingController.getAllListings());

        }catch (err) {
            next(err);
        }
    }
    // async updateListing(req, res, next) {
    //     try {
    //         const feed = req.body;
    //         const { listingId } = req.params
    //         const newfeedback = await Feedback.create(feed)
    //         const newListing = await Listing.findByIdAndUpdate(
    //             blogId,
    //             {
    //                 $push: { feedbacks: newfeedback._id }
    //             },
    //             { new: true, useFindAndModify: false },
    //         );
    //         res.send(newTag);
    //     } catch (err) {
    //         next(err)
    //     }
    // }
};