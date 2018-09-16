const Joi = require('joi');
const express = require('express');
const router = express.Router();

var genres = [{ id: 1, name: "comedy"}, { id: 2, name: "action"}];

router.get('/', (req, res) => {
    return res.send(genres);
});

router.get('/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('Genre with given ID not found');
    
    return res.send(genre);
});

router.post('/', (req, res) => {
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = {
        id: genres.length + 1,
        name: req.body.name
    };
    genres.push(genre);

    res.send(genre);
});

router.put('/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('Genre with given ID not found');
    
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    genre.name = req.body.name;

    res.send(genre);
});

router.delete('/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('Genre with given ID not found');
    
    genres.splice(genres.indexOf(genre), 1);

    res.send(genre);
});

function validateGenre(genre) {
    const schema = {
        name: Joi.string().max(20).required()
    };
    return Joi.validate(genre, schema);
}

module.exports = router;