"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Vendors_1 = require("../../Controller/Aggregation/Vendors");
const route = require('express').Router();
const { verify } = require('../../MiddleWare/TokenMiddleware');
route.get('/', verify, Vendors_1.vendors);
module.exports = route;
