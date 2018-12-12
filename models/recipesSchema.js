const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const recipeSchema = mongoose.Schema({
    recipeName: { type: String, required: true, default: '' },
    ingeridents: { type: [], required: true, default:''},
    cookingTime: {type: String, required: true, default: ''},
    directions: {type: [], required: true, default: '' }
});

recipeSchema.methods.serialize = function() {
    return {
        id: this._id,
        recipeName: this.recipeName || '',
        ingeridents: this.ingeridents || '',
        cookingTime: this.cookingTime || '',
        directions: this.directions || ''
    };
};


const Recipe = mongoose.model("Recipe", recipeSchema, );

module.exports = { Recipe };