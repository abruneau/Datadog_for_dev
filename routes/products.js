const express = require('express');

const router = express.Router();

const createError = require('http-errors');

// Products Array

const products = [{ id: '1', name: 'Playstation 5', inStock: false }];

// GET / => array of items

router.get('/', (req, res) => {
    res.json('products');
});

// GET / => items by ID

router.get('/:id', (req, res, next) => {
    const product = products.find(
        (product) => product.id === String(req.params.id)
    );

    // GET /id => 404 if item not found

    if (!product) {
        return next(createError(404, 'Not Found'));
    }

    res.json(product);
});

router.post('/', (req, res, next) => {
    const { body } = req;

    if (typeof body.name !== 'string') {
        return next(createError(400, 'Validation Error'));
    }

    const newProduct = {
        id: '1',

        name: body.name,

        inStock: false,
    };

    products.push(newProduct);

    res.status(201).json(newProduct);
});

module.exports = router;