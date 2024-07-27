const mongoose = require('mongoose');

const mongodbUrl = "mongodb+srv://bekeledagim3:xte2cqnoF61IyGNO@cluster0.foh0xm3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

async function connectDB() {
    try {
        await mongoose.connect(mongodbUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1); // Exit process with failure
    }
}

module.exports = connectDB;
