const mongoose = require('mongoose');

async function connectToMongooseDB() {
    const url = 'mongodb://localhost:27017/xmleditor'; // Replace with your actual MongoDB URL

    try {
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB using Mongoose');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
}

module.exports = connectToMongooseDB;