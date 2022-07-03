"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyVendor = void 0;
const userDb = require('../Models/UsersModels');
const vendorDb = require('../Models/VendorsModels');
const verifyVendor = async (req, res, next) => {
    // Check user vendor atau bukan
    try {
        const user = await userDb.findOne({ _id: req.user._id, vendor: true });
        if (!user) {
            return res.json({ data: user, message: 'Anda bukan Vendor' });
        }
        // Chek user sudah punya vendor atau belum
        const vendor = await vendorDb.findOne({ vendorId: user._id });
        if (!vendor) {
            return res.json({ data: vendor, message: 'Vendor kamu belum ada' });
        }
        req.vendor = vendor;
        next();
    }
    catch (error) {
        res.json(error);
    }
};
exports.verifyVendor = verifyVendor;
