'use strict';
const express = require('express');
const router = express.Router();
const {Rating} = require('../models/ratingSchema');


// GET to Hello page
router.get('/', (req, res) => {
    res.send('Hello world');
})

router.post('/', (req, res) => {
    Rating
    .create({
        starRating: req.body.starRating,
        comments: req.body.comments
    })
    .then(rating => res.status(201).json(rating.serialize()))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Something went wrong' });
    });

    // res.json(req.body);

});

router.put('/:id', (req, res) => {
    Rating.findByIdAndUpdate(
        req.params.id,
        req.body, { new: true },
        (err, rating) => {
            if (err) return res.status(500).send(err);
            return res.status(201).json(rating.serialize());

        });
});

router.delete("/:id", (req, res) => {
    Rating.findByIdAndRemove(req.params.id, (err, rating) => {
        if (err) return res.status(500).send(err);
        const response = {
            message: 'rating deleted successfully',
            id: rating._id
        };
        return res.status(200).send(response);
    })
});


module.exports = router;