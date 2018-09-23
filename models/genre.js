const mongoose = require('mongoose');
const Joi = require('joi');

const Genre = mongoose.model('Genre', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 20
    }
}));

function validateGenre(genre) {
    const schema = {
        name: Joi.string().max(20).required()
    };
    return Joi.validate(genre, schema);
}

exports.Genre = Genre;
exports.validate = validateGenre;