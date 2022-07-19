"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GetVendor_1 = require("../../Controller/Service/Vendor/Get Vendor/GetVendor");
const route = require('express').Router();
const { verify } = require('../../MiddleWare/TokenMiddleware');
route.get('/', verify, GetVendor_1.GetVendors);
module.exports = route;
