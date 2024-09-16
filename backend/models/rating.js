const mongoose = require('mongoose')

const RatingSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    recipe: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe', required: true },
    rating: { type: Number, required: true },
    comment: { type: String }
})

const Rating = mongoose.model('Rating', RatingSchema);
module.exports = Rating