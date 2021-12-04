const { Message, User } = require('../models');

module.exports = {
    async createMessage(agentName,message) {
        try {
            const newMessage = await Message.create(message);
            const agent =await User.findOne({username:agentName,is_agent:true});
            console.log(agent._id);
            /////////bug
            await User.findByIdAndUpdate(
                agent._id,
                {
                    $push: { message: newMessage._id }
                },
                { new: true, useFindAndModify: false },
            );
             return newMessage;
        } catch (err) {
            throw err;
        }
    },
    async getAllMessages(userId) {
        try {
            const listing = await User.find({_id:userId,is_agent:true}).populate('message');
            return listing.message;
        } catch (err) {
            throw err;
        }
    }
};