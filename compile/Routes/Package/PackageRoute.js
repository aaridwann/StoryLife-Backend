"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Route = require('express').Router();
const Paket = require('../../Controller/PackageController');
const TokenMiddleware_1 = require("../../MiddleWare/TokenMiddleware");
const VendorMiddleware_1 = require("../../MiddleWare/VendorMiddleware");
Route.post('/add', TokenMiddleware_1.verify, VendorMiddleware_1.verifyVendor, (req, res) => {
    const paket = new Paket(req, res);
    paket.addPackage(res);
});
Route.delete('/:id', TokenMiddleware_1.verify, VendorMiddleware_1.verifyVendor, (req, res) => {
    const paket = new Paket(req, res);
    paket.deletePackage(req, res);
});
Route.put('/:id', TokenMiddleware_1.verify, VendorMiddleware_1.verifyVendor, (req, res) => {
    const paket = new Paket(req, res);
    paket.editPackage(req, res);
});
module.exports = Route;
