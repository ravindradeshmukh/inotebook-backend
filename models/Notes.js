const mongoose = require('mongoose');

const NoteSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    desciption:{
        type: String,
        required: true
    },
    tag:{
        type: String,
        default: 'General'
    },
    createdOn:{
        type: Date,
        default: Date.Now
    }
})

module.exports = mongoose.model('note', NoteSchema);

