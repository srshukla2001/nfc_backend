// catalogueSchema.js
const mongoose = require('mongoose');

const catalogueSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    // Add other necessary fields for a catalogue item
});

const Catalogue = mongoose.model('Catalogue', catalogueSchema);

module.exports = Catalogue;
