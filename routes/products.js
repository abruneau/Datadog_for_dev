const express = require('express');

const router = express.Router();

const createError = require('http-errors');

let fail = false

// Products Array
// Add more products

const products = [{ id: '1', name: 'Playstation 5', inStock: false }];

// GET / => array of items

router.get('/', (_req, res, next) => {
    if (fail && Math.random() < 0.8) {
       return next(createError(500, 'Internal Server Error'))
    }
    res.json("products");
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
        id: (products.length + 1).toString(),

        name: body.name,

        inStock: false,
    };

    products.push(newProduct);

    res.status(201).json(newProduct);
});

router.get('/fail/on', (_req, res) => {
    fail = true
    res.json({});
});

router.get('/fail/off', (_req, res) => {
    fail = false
    res.json({});
});

module.exports = router;