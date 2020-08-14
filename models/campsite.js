const mongoose = require('mongoose');
const Schema = mongoose.Schema;  //using shorthand (not required)

// Create a schema
const campsiteSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    }
}, {  //second, optional argument for configuration options
    timestamps: true
});

// Create a model using the schema
const Campsite = mongoose.model('Campsite', campsiteSchema); //mongoose.model() returns a constructor function

module.exports = Campsite;