// app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

// Body parser middleware
app.use(bodyParser.json());
app.use(cors());
// MongoDB connection
mongoose.connect('mongodb+srv://srshukla321:srshukla@cluster0.jjxtmj4.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

const User = require('./userSchema'); // Path to your User schema file
const Catalogue = require('./catalogueSchema'); // Path to your Catalogue schema file

// POST route to handle form submission for User
app.post('/api/submit-user', async (req, res) => {
    try {
        const userData = req.body;
        const newUser = new User(userData);
        await newUser.save();
        res.status(201).json({ message: 'User data stored successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find(); // Retrieve all users from the database
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/api/users/:mobileNumber', async (req, res) => {
    const { mobileNumber } = req.params;

    try {
        const user = await User.findOne({ number: mobileNumber }); // Find user by mobile number
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.setHeader('Content-Type', 'application/json'); // Set Content-Type header to specify JSON response
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// POST route to handle form submission for Catalogue
app.post('/api/submit-catalogue', async (req, res) => {
    try {
        const catalogueData = req.body;
        const newCatalogue = new Catalogue(catalogueData);
        await newCatalogue.save();
        res.status(201).json({ message: 'Catalogue data stored successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
