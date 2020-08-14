const mongoose = require('mongoose');
const Campsite = require('./models/campsite');

const url = 'mongodb://localhost:27017/nucampsite';   //connect to nucampsite db in mongodb server
const connect = mongoose.connect(url, {    //replacing MongoClient.connect
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

connect.then(() => {
    console.log('Connected correctly to server');
    
    //instantiate new document by using static method; document is autosaved; a promise is returned
    Campsite.create({
        name: 'React Lake Campground',
        description: 'test'
    })
    .then(campsite => {
        console.log(campsite);

        return Campsite.findByIdAndUpdate(campsite._id, {
            $set: { description: 'Updated Test Document' }
        }, {
            new: true  //return the updated document (default is to return original doc)
        });
    })
    .then(campsite => {
        console.log(campsite);

        //Add comment subdocument
        campsite.comments.push({
            rating: 5,
            text: 'What a magnificent view!',
            author: 'Tinus Lorvaldes'
        });

        return campsite.save();  //save the change
    })
    .then(campsite => {
        console.log(campsite);
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