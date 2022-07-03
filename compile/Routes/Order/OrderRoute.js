"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const OrderController_1 = require("../../Controller/OrderController");
const TokenMiddleware_1 = require("../../MiddleWare/TokenMiddleware");
const route = require('express').Router();
route.get('/:id', (req, res) => {
    res.json("get jalan");
});
route.put('/cancel', TokenMiddleware_1.verify, OrderController_1.cancelOrder);
module.exports = route;
