"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getFollow_1 = require("../../Controller/Service/Follow/getFollow");
const DetailPackage_1 = require("../../Controller/Vendor/DetailPackage");
const ServicePackage_1 = require("../../Controller/Vendor/ServicePackage");
const VendorController_1 = require("../../Controller/VendorController");
const userToVendor_1 = require("../../Controller/Service/Tobe Vendor/userToVendor");
const { verify } = require('../../MiddleWare/TokenMiddleware');
const route = require('express').Router();
route.post('/addvendor', verify, userToVendor_1.userToVendor);
route.get('/', verify, VendorController_1.getVendor);
route.get('/schedule', verify, VendorController_1.getVendorSchedule);
route.get('/package', verify, ServicePackage_1.ServicePackage);
route.get('/follow', verify, getFollow_1.getFollow);
route.get('/package/detail', verify, DetailPackage_1.DetailPackage);
module.exports = route;
