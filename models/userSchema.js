'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

mongoose.Promise = global.Promise;

//Schema for userDetailsSchema 
const userSchema = mongoose.Schema({
    firstName: { type: String, required: true, default: '' },
    lastName: { type: String, required: true, default: '' },
    username:{ type: String, required: true, default: '' },
    password: { type: String, required: false }
});

userSchema.methods.serialise = function() {
    return {
        firstName: this.firstName || '',
        lastName: this.lastName || '',
        username: this.username || ''
    };
};

//Validating the password
userSchema.methods.validatePassword = function(password){
    return bcrypt.compare(password, this.password);
};

//Hash the password
userSchema.statics.hashPassword = function(password){
    return bcrypt.hash(password, 10);
};

const User = mongoose.model("User", userSchema, );

module.exports = { User };