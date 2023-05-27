//modals start with capital leter
const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    pass: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

//if collection not exists then create else make connection
const User=mongoose.model('user',UserSchema);//noew we convert our shema to model

// User.createIndexes();

module.exports=User;