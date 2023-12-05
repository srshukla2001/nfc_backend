// userSchema.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    title: String,
    company: String,
    userImg: String,
    email: {
        type: String,
        required: true,
        unique: true,
    },
    number: String,
    website: String,
    address: {
        line1: String,
        line2: String,
    },
    socialMediaLinks: [String],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
