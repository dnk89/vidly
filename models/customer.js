const mongoose = require('mongoose');
const Joi = require('joi');

const Customer = mongoose.model('Customer', new mongoose.Schema({
    isGold: {
        type: Boolean,
        required: true,
        default: false
    },
    name: {
        type: String,
        required: true,
        maxlength: 30
    },
    phone: {
        type: String,
        maxlength: 20,
    }
}));

function validateCustomer(customer) {
    const schema = {
        isGold: Joi.boolean(),
        name: Joi.string().max(30).required(),
        phone: Joi.string().max(20)
    };
    return Joi.validate(customer, schema);
}

exports.Customer = Customer;
exports.validate = validateCustomer;