"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editPackage = void 0;
const mongodb_1 = require("mongodb");
const PackageModels_1 = require("../../../Models/PackageModels");
const editPackage = async (req, res) => {
    // 1. Validation Body
    const valid = await Validation(req.body);
    if (!valid.state) {
        return res.status(400).json(valid);
    }
    try {
        const edit = await PackageModels_1.packagedb.findOneAndUpdate({ vendorId: req.vendor.vendorId, 'package._id': new mongodb_1.ObjectId(req.params.id) }, { $set: { 'package.$': valid.message } }, { package: 1, new: true });
        if (!edit) {
            return res.status(400).json({ state: false, message: 'not found' });
        }
        return res.status(201).json({ state: true, message: 'success update', data: edit });
    }
    catch (error) {
        return res.status(500).json({ state: false, message: error.toString() });
    }
};
exports.editPackage = editPackage;
async function Validation(data) {
    const message = (m) => {
        return { state: false, message: m };
    };
    if (!data.packageName) {
        return message('package name not found');
    }
    else if (!data.category) {
        return message('pacakge category not found');
    }
    else if (!data.price) {
        return message('package price not found');
    }
    else if (!data.details) {
        return message('package details not found');
    }
    else if (!data.image || !data.date) {
        data.image = '';
        data.date = Date.now();
    }
    if (!PackageModels_1.CategoryPackage.includes(data.category)) {
        return message('category not correct');
    }
    return { state: true, message: data };
}
