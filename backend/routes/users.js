const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Recipe = require('../models/recipe');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
require('dotenv').config();

// Register a new user
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: 'User already exists' });

        user = new User({ name, email, password });
        await user.save();

        // Generate a JWT token
        const payload = { user: { id: user.id } };
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            res.status(201).json({ token });
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// User login

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: 'Invalid login credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

        // Generate a JWT token
        const payload = { user: { id: user.id } };
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// Example route for fetching user data and recipes
router.get('/me', auth, async (req, res) => {
    try {
      // Fetch the user based on the authenticated user's ID
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }
  
      // Fetch the recipes associated with the user
      const recipes = await Recipe.find({ user: req.user.id });
      
      res.json({ user, recipes });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ msg: 'Server Error' }); 
    }
  });
  
  module.exports = router;
  

//user deletion

router.delete('/:id', auth, async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findById(id);

        //check if the user exists
        if (!user) {
            return res.status(404).json({ msg: 'User not found' })
        }


        await User.findByIdAndDelete(id);
        res.json({ msg: 'User deleted successfuly' })
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error')
    }
})

module.exports = router;

