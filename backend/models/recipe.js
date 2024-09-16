const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    ingredients: { type: [String], required: true }, 
    instructions: { type: [String], required: true }, 
    images: { type: [String], default: [] },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, default: Date.now },
});

const Recipe = mongoose.model('Recipe', RecipeSchema);
module.exports = Recipe;
