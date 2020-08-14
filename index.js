const mongoose = require('mongoose');
const Campsite = require('./models/campsite');

const url = 'mongodb://localhost:27017/nucampsite'; //connect to nucampsite db in mongodb server
const connect = mongoose.connect(url, {    //replacing MongoClient.connect
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

connect.then(() => {
    console.log('Connected correctly to server');
    
    //instantiate new document
    const newCampsite = new Campsite({
        name: 'React Lake Campground',
        description: 'test'
    });

    //mongoose method to save document to the database; returns a promise
    newCampsite.save() 
    .then(campsite => {
        console.log(campsite);
        return Campsite.find();  //returns all documents based on Campsite model (static method)
    })
    .then(campsites => {
        console.log(campsites);
        return Campsite.deleteMany();  //static method
    })
    .then(() => {
        return mongoose.connection.close();  //close connection
    })
    .catch(err => {
        console.log(err);
        mongoose.connection.close();
    });
});