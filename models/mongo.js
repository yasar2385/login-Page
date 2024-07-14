const {
    MongoClient
} = require('mongodb');

async function connectToMongoDB() {
    const url = 'mongodb://localhost:27017/xmleditor'; // Replace with your actual MongoDB URL
    const client = new MongoClient(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    try {
        await client.connect();
        console.log('Connected to MongoDB successfully');
        return client.db(); // Return the reference to the database
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
}

module.exports = connectToMongoDB;