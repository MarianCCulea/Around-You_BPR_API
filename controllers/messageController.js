const { Message, User } = require('../models');

module.exports = {
    async createMessage(agentName,message) {
        try {
            const newMessage = await Message.create(message);
            const agent =await User.findOne({username:agentName,is_agent:true});
            await User.findByIdAndUpdate(
                agent.id,
                {
                    $push: { messages: newMessage.id }
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
            const user = await User.findOne({id:userId,is_agent:true}).populate({ path: 'messages' }).lean();
            return user.messages;
        } catch (err) {
            throw err;
        }
    }
};