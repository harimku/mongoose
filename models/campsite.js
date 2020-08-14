const mongoose = require('mongoose');
const Schema = mongoose.Schema;  //using shorthand (not required)

// Create a schema (this is for a subdocument)
const commentSchema = new Schema({
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

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
    },
    comments: [commentSchema]  //Every campsite document can now store multiple comment documents stored within an array
}, {  //second, optional argument for configuration options
    timestamps: true
});

// Create a model using the schema
const Campsite = mongoose.model('Campsite', campsiteSchema); //mongoose.model() returns a constructor function

module.exports = Campsite;