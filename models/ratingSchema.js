const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const ratingSchema = mongoose.Schema({
    starRating: { type: String, required: true, default: '' },
    comments: {type: String, default: ''},
});

ratingSchema.methods.serialize = function() {
    return {
        starRating: this.starRating || '',
        comments: this.comments || ''
    };
};


const Rating = mongoose.model("Rating", ratingSchema, );

module.exports = { Rating };