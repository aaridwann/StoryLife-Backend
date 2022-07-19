"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DetailPackage_1 = require("../../Controller/Service/Package/DetailPackage");
const GetServicePackage_1 = require("../../Controller/Service/Package/GetServicePackage");
const userToVendor_1 = require("../../Controller/Service/Vendor/User To Vendor/userToVendor");
const { verify } = require('../../MiddleWare/TokenMiddleware');
const route = require('express').Router();
route.post('/addvendor', verify, userToVendor_1.userToVendor);
// route.get('/', verify, getVendor)
// route.get('/schedule', verify, getVendorSchedule)
route.get('/package', verify, GetServicePackage_1.ServicePackage);
route.get('/package/detail', verify, DetailPackage_1.DetailPackage);
module.exports = route;
