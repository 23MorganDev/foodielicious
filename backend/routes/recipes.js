const express = require("express");
const router = express.Router();
const Recipe = require("../models/recipe");
const multer = require("multer");
const auth = require("../middleware/auth");

//set up multer file storage
const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "uploads/"); //folder to store the images
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/add", auth, upload.array("images", 5), async (req, res) => {
  const { title, ingredients, instructions, user, images } = req.body;
  try {
    const userId = user || req.user.id;

    // Extract image paths from multer
    const images = req.files.map((file) => file.path);

    const newRecipe = new Recipe({
      title,
      ingredients,
      instructions,
      images,
      user: req.user.id,
    });
    const recipe = await newRecipe.save();
    res.json(recipe);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Error adding new recipe");
  }
});

// Get all recipes for a user
router.get("/", auth, async (req, res) => {
  try {
    const recipes = await Recipe.find({ user: req.user.id });
    res.json(recipes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// Get a specific recipe by ID
router.get("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await Recipe.findOne({ _id: id, user: req.user.id });

    if (!recipe) {
      return res
        .status(404)
        .json({ msg: "Recipe not found or not authorized to view." });
    }

    res.json(recipe);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// Update a specific recipe by ID
router.put("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;

    // Destructure the request body to get the updated recipe details
    const { title, ingredients, instructions, user } = req.body;

    // Construct the updated recipe object
    const updatedRecipeDetails = {
      title,
      ingredients,
      instructions,
      user: req.user.id,
    };

    // Find the recipe by ID and update it with the new details
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      id,
      { $set: updatedRecipeDetails },
      { new: true }
    );

    if (!updatedRecipe) {
      return res
        .status(404)
        .json({ msg: "Recipe not found or not authorized to update." });
    }

    res.json(updatedRecipe);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

//delete a recipe

router.delete("/:id", auth, async (req, res) => {
  try {
    //extract the id of the recipe
    const { id } = req.params;

    const recipe = await Recipe.findOne({
      _id: id,
      user: req.user.id,
    });

    if (!recipe) {
      return res.status(404).json({ msg: "Recipe could not be found" });
    }

    //if the recie exist and belongs to the user, delete it

    await Recipe.findByIdAndDelete(id);
    res.json({ msg: "Recipe deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
