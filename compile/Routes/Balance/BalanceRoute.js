"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Transfer_1 = require("../../Controller/Service/Ballance/Transfer");
const TokenMiddleware_1 = require("../../MiddleWare/TokenMiddleware");
const route = require('express').Router();
route.put('/transfer', TokenMiddleware_1.verify, Transfer_1.Transfer);
module.exports = route;
