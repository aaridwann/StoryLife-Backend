"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const route = require('express').Router();
route.get('/:id', (req, res) => {
    res.json("get jalan");
});
// route.put('/cancel', verify, cancelOrder)
module.exports = route;
