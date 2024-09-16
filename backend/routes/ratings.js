const express = require('express');
const router = express.Router();
const Rating = require('../models/rating');
const auth = require('../middleware/auth');

//add a rating to  arecipe

router.post('/', auth, async (req, res) => {
    const { recipe, rating, comment } = req.body;
    try {
        const newRating = new Rating({
            user: req.user.id,
            recipe,
            rating,
            comment
        })

        const rate = await newRating.save();
        res.json(rate);
    } catch (error) {
        console.error(err.message)
        res.status(500).send('Error adding a rating for recipe')
    }
})


//get ratings for a recipe

router.get('/:recipeId', async (req, res) => {
    try {
        const ratings = await Rating.find({ recipe: req.params.recipeId })
        res.json(ratings);
    } catch (error) {
        console.error(err.message)
        res.status(500).send('Error fetching ratingas for recipe')
    }
})



module.exports = router;