"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AddPackage_1 = require("../../Controller/Service/Package/AddPackage");
const DeletePackage_1 = require("../../Controller/Service/Package/DeletePackage");
const EditPackage_1 = require("../../Controller/Service/Package/EditPackage");
const TokenMiddleware_1 = require("../../MiddleWare/TokenMiddleware");
const VendorMiddleware_1 = require("../../MiddleWare/VendorMiddleware");
const Route = require('express').Router();
Route.post('/add', TokenMiddleware_1.verify, VendorMiddleware_1.verifyVendor, AddPackage_1.addPackage);
Route.put('/:id', TokenMiddleware_1.verify, VendorMiddleware_1.verifyVendor, EditPackage_1.editPackage);
Route.delete('/:id', TokenMiddleware_1.verify, VendorMiddleware_1.verifyVendor, DeletePackage_1.deletePackage);
module.exports = Route;
