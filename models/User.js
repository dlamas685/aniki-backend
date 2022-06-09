const { Schema, model} = require('mongoose');

const UserSchema = Schema({
    username:{
        type: String,
        required: true,
        unique:true
    },
    email:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    favorites:{
        type: [Number],
        required: false
    },
    conditions: {
        type: Boolean,
        required: true
    }
});

module.exports = model('User', UserSchema);