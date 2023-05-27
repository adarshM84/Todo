//modals start with capital leter
const mongoose = require('mongoose');
const { Schema } = mongoose;

const NotesSchema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    tag: {
        type: String,
        default:"zgeneral"
    },
    date: {
        type: Date,
        default: Date.now
    }
});

//noew we convert our shema to model
const Notes=mongoose.model('notes',NotesSchema);

module.exports=Notes;