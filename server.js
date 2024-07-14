const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
const path = require('path')
// const User = require('./models/User'); // Adjust the path to your User model
const sendEmail = require('./models/mailer'); // Import the sendEmail function

// database - mongo
const connectToMongoDB = require('./models/mongo');
// database - mongoose
// const connectToMongooseDB = require('./models/mongoose');

var db;
// Middleware to parse JSON bodies
app.use(express.json());

// Login route
app.post('/login', async (req, res) => {
    console.log("listen login");

    //console.log(req.body);
    const {
        username,
        password
    } = req.body;
    try {
        console.log("username==> " + username);
        // Find the user by username
        db = await connectToMongoDB();
        const user = await db.collection('User').findOne({
            username
        });

        if (!user) {
            // User not found
            return res.status(404).json({
                message: 'User not found'
            });
        }

        // Compare the provided password with the hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            // Incorrect password
            return res.status(401).json({
                message: 'Incorrect password'
            });
        } else {
            console.log("successfully connected");
        }
        // Validation successful! Redirect to the landing page
        // res.redirect('/contact'); // Adjust the actual landing page route
        return res.status(200).json({
            message: 'successfully connected'
        });
    } catch (error) {
        console.error('Error validating login:', error);
        res.status(500).json({
            message: 'Internal server error'
        });
    }
});

//  send mail from contact form
app.post('/send-email', async (req, res) => {
    const {
        subject,
        text,
        html
    } = req.body;
    try {
        await sendEmail(subject, text, html);
        res.json({
            message: 'Email sent successfully!'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error sending email'
        });
    }
});



app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
})

app.get('/home', (req, res) => {
    res.send('Welcome to Home Page!')
})
app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, '/contact.html'));
})



// Serve model
app.use('/models', express.static('models'));

// Serve images
app.use('/images', express.static('images'));

// Serve vendor
app.use('/vendor', express.static('vendor'));

// Serve fonts
app.use('/fonts', express.static('fonts'));

// Serve CSS
app.use('/css', express.static('css'));

// Serve JavaScript
app.use('/js', express.static('js'));

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});