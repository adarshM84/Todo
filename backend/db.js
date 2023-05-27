const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/todo";

const connectToMongo = async () => {
    mongoose.connect(mongoURI).then(() => {
        console.log('Connected Successfully!');
    }).catch(error => console.log('Failed to connect', error))
}

module.exports = connectToMongo;