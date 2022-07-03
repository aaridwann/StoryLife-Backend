"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServicePackage = void 0;
const { packagedb } = require('../../Models/PackageModels');
const ServicePackage = async (req, res) => {
    let { vendorId } = req.query;
    if (!vendorId || undefined) {
        return res.status(400).json('Vendor id not found');
    }
    try {
        let respond = await packagedb.findOne({ vendorId: vendorId }, { _id: 0, createdAt: 0, updatedAt: 0, __v: 0 });
        if (respond === null) {
            return res.status(200).json('package is null');
        }
        else {
            return res.status(200).json(respond);
        }
    }
    catch (error) {
        return res.json(error);
    }
};
exports.ServicePackage = ServicePackage;
