"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyVendor = void 0;
const mongodb_1 = require("mongodb");
const UsersModels_1 = require("../Models/UsersModels");
const VendorsModels_1 = require("../Models/VendorsModels");
const verifyVendor = async (req, res, next) => {
    try {
        // Check user vendor atau bukan
        const user = await UsersModels_1.userDb.findOne({ _id: new mongodb_1.ObjectId(req.user._id), vendor: true });
        if (!user) {
            return res.json({ data: user, message: 'Anda bukan Vendor' });
        }
        // Chek user sudah punya vendor atau belum
        const vndr = await VendorsModels_1.vendor.findOne({ vendorId: user._id });
        if (!vndr) {
            return res.json({ data: vndr, message: 'Vendor kamu belum ada' });
        }
        req.vendor = vndr;
        next();
    }
    catch (error) {
        res.json(error);
    }
};
exports.verifyVendor = verifyVendor;
