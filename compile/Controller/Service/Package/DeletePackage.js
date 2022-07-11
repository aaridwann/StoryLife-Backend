"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePackage = void 0;
const mongodb_1 = require("mongodb");
const PackageModels_1 = require("../../../Models/PackageModels");
const deletePackage = async (req, res) => {
    if (!req.params.id) {
        return res.status(400).json({ state: false, message: 'params id not found' });
    }
    try {
        const destroy = await PackageModels_1.packagedb.updateOne({ vendorId: req.vendor.vendorId, 'package._id': new mongodb_1.ObjectId(req.params.id) }, { $pull: { package: { _id: new mongodb_1.ObjectId(req.params.id) } } });
        if (!destroy.modifiedCount) {
            return res.status(400).json('package not found');
        }
        return res.status(201).json('package success delete');
    }
    catch (error) {
        return res.status(500).json(error.toString());
    }
};
exports.deletePackage = deletePackage;
