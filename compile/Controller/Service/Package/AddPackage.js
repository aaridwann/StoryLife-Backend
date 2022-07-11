"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addPackage = void 0;
const PackageModels_1 = require("../../../Models/PackageModels");
const addPackage = async (req, res) => {
    const data = req.body;
    const namePckg = new RegExp(data.packageName, 'ig');
    try {
        // Check Package name
        const checkPackage = await PackageModels_1.packagedb.findOne({ vendorId: req.vendor.vendorId, 'package.packageName': { $regex: namePckg } });
        if (checkPackage) {
            return res.json({ state: false, message: 'package already created' });
        }
        // Insert package
        let create = await PackageModels_1.packagedb.findOneAndUpdate({ vendorId: req.vendor.vendorId }, { $push: { package: data } });
        if (!create) {
            return res.json({ state: false, message: 'add package failed', logs: 'vendor not found' });
        }
        return res.json({ state: true, message: 'ok' });
    }
    catch (error) {
        return res.json({ state: false, message: error.toString() });
    }
};
exports.addPackage = addPackage;
