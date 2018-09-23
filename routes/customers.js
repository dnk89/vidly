const mongoose = require('mongoose');
const Joi = require('joi');
const express = require('express');
const router = express.Router();

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

router.get('/', async (req, res) => {
    const customers = await Customer.find().sort('name');
    return res.send(customers);
});

router.get('/:id', async (req, res) => {
    const customer = await Customer.findById(req.params.id);

    if (!customer) return res.status(404).send('Customer with given ID not found');

    return res.send(customer);
});

router.post('/', async (req, res) => {
    const { error } = validateCustomer(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let customer = new Customer({ 
        isGold: req.body.isGold,
        name: req.body.name,
        phone: req.body.phone 
    });
    customer = await customer.save();

    res.send(customer); 
});

router.put('/:id', async (req, res) => {
    const { error } = validateCustomer(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    const customer = await Customer.findByIdAndUpdate(req.params.id, { 
        isGold: req.body.isGold,    
        name: req.body.name,
        phone: req.body.phone 
    }, 
    { new: true });
    
    if (!customer) return res.status(404).send('Customer with given ID not found');

    res.send(customer);
});

router.delete('/:id', async (req, res) => {
    const customer = await Customer.findByIdAndRemove(req.params.id);

    if (!customer) return res.status(404).send('Customer with given ID not found');

    res.send(customer);
});

function validateCustomer(customer) {
    const schema = {
        isGold: Joi.boolean(),
        name: Joi.string().max(30).required(),
        phone: Joi.string().max(20)
    };
    return Joi.validate(customer, schema);
}

module.exports = router;