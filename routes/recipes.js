'use strict';
const express = require('express');
const router = express.Router();
const { Recipe } = require('../models/recipesSchema');


// GET to Hello page
router.get('/', (req, res) => {
    Recipe.find()
        .then(recipes => {
            res.json({
                recipes: recipes.map(recipe => recipe.serialize())
            });
        })
});

router.get('/:id', (req, res) => {
    Recipe.findById(req.params.id)
        .then(recipe => {
            res.json(recipe.serialize());
        })
});


router.post('/', (req, res) => {
    console.log('Res:', req.body);
    Recipe.create({
        recipeName: req.body.recipeName,
        ingeridents: req.body.ingeridents,
        cookingTime: req.body.cookingTime,
        directions: req.body.directions
    })
        .then(recipe => res.status(201).json(recipe.serialize()))
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Something went wrong' });
        });
    res.json(req.body);

});

router.put('/:id', (req, res) => {
    Recipe.findByIdAndUpdate(
        req.params.id,
        req.body, { new: true },
        (err, recipe) => {
            if (err) return res.status(500).send(err);
            return res.status(201).json(recipe.serialize());

        });
});

router.delete("/:id", (req, res) => {
    Recipe.findByIdAndRemove(req.params.id, (err, recipe) => {
        if (err) return res.status(500).send(err);
        const response = {
            message: 'Recipe deleted successfully',
            id: recipe._id
        };
        return res.status(200).send(response);
    })
});


module.exports = router;