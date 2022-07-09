const mongoose = require('mongoose');
const { Schema } = mongoose;
const { Types } = Schema;

const UserSchema = new Schema({
    _id:{
        type: Types.ObjectId,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    createdOn:{
        type: Date,
        default: Date.Now
    }
})

const User = mongoose.model('user', UserSchema);
User.createIndexes();

module.exports = User;