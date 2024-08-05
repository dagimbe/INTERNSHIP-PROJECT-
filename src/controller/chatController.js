const chatService = require('../services/chatService');

module.exports = {

    async addMessage(req, res) {
        const { chatId } = req.params;
        const { text } = req.body;
        const userId = req.user; 
        try {
            const message = await chatService.addMessage(chatId, text, userId);
            res.status(200).json(message);
        } catch (error) {
            res.status(500).json({ message: `Failed to add message: ${error.message}` });
        }
    },

    async getChats(req, res) {
        const userId = req.user;

        try {
            const chats = await chatService.getChats(userId);
            res.status(200).json(chats);
        } catch (error) {
            res.status(500).json({ message: `Failed to get chats: ${error.message}` });
        }
    },

    async getChat(req, res) {
        const { chatId } = req.params;
        const userId = req.user; 

        try {
            const { chat, messages } = await chatService.getChat(chatId, userId);
            res.status(200).json({ chat, messages });
        } catch (error) {
            res.status(500).json({ message: `Failed to get chat: ${error.message}` });
        }
    },

    async addChat(req, res) {
        const userId = req.user;  
        const { receiverId } = req.body;

        try {
            const newChat = await chatService.addChat(userId, receiverId);
            res.status(201).json(newChat);
        } catch (error) {
            res.status(500).json({ message: `Failed to add chat: ${error.message}` });
        }
    },

    async getMessages(req, res) {
        const { chatId } = req.params;
        const userId = req.user;

        try {
            const messages = await chatService.getMessages(chatId, userId);
            res.status(200).json(messages);
        } catch (error) {
            res.status(500).json({ message: `Failed to get messages:you are not the user  ${error.message}` });
        }
    },

    async readChat(req, res) {
        const { chatId } = req.params;
        const userId = req.user; 

        try {
            const chat = await chatService.readChat(chatId, userId);
            res.status(200).json(chat);
        } catch (error) {
            res.status(500).json({ message: `Failed to read chat: ${error.message}` });
        }
    }
}


