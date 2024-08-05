const Chat = require('../models/chat.model');
const Message = require('../models/message.model');
const User = require('../models/user.model');

module.exports = {
    async addMessage(chatId, text, userId) {
        try {
            // Find the chat that the user is a participant of
            const chat = await Chat.findOne({
                _id: chatId,
                participants: userId
            });

            if (!chat) throw new Error('Chat not found!');

            // Create and save the new message
            const message = new Message({
                text,
                sender: userId,
                chatId
            });

            await message.save();

            // Update the chat with the new message details
            chat.lastMessage = text;
            chat.seenBy.push(userId);
            await chat.save();

            return message;
        } catch (error) {
            throw new Error(`Failed to add message: ${error.message}`);
        }
    },

    async getChats(userId) {
        try {
            // Find all chats that the user is a participant of
            return await Chat.find({
                participants: userId
            }).populate('participants', 'username avatar'); // Populate participants with selected fields
        } catch (error) {
            throw new Error(`Failed to get chats: ${error.message}`);
        }
    },

    async getChat(chatId, userId) {
        try {
            // Find the specific chat that the user is a participant of
            const chat = await Chat.findOne({
                _id: chatId,
                participants: userId
            });

            if (!chat) throw new Error('Chat not found!');

            // Find and populate messages for the chat
            const messages = await Message.find({ chatId }).populate('sender', 'username avatar');

            // Mark the chat as read by the user
            chat.seenBy.push(userId);
            await chat.save();

            return { chat, messages };
        } catch (error) {
            throw new Error(`Failed to get chat: ${error.message}`);
        }
    },

    async addChat(userId, receiverId) {
        try {
         
            const newChat = new Chat({
                participants: [userId, receiverId]
            });

            return await newChat.save();
        } catch (error) {
            throw new Error(`Failed to add chat: ${error.message}`);
        }
    },

    async getMessages(chatId, userId) {
        try {
           
            const chat = await Chat.findOne({
                _id: chatId,
                participants: userId
            });

            if (!chat) throw new Error('Chat not found!');

          
            return await Message.find({ chatId }).populate('sender', 'username avatar');
        } catch (error) {
            throw new Error(`Failed to get messages: ${error.message}`);
        }
    },

    async readChat(chatId, userId) {
        try {
          
            const chat = await Chat.findOne({
                _id: chatId,
                participants: userId
            });

            if (!chat) throw new Error('Chat not found!');

            chat.seenBy = [userId];
            await chat.save();

            return chat;
        } catch (error) {
            throw new Error(`Failed to read chat: ${error.message}`);
        }
    }
};
