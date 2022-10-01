"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DetailPackage = void 0;
const PackageModels_1 = require("../../../Models/PackageModels");
const DetailPackage = async (req, res) => {
    // init id from query req
    let { id } = req.query;
    // handler if id not found
    if (!id || id == undefined || id == null) {
        return res.status(400).json('id package not found');
    }
    // find id in db
    let response = await PackageModels_1.packagedb.findOne({ 'package._id': id }, { _id: 0, 'package.$': 1 });
    if (response === null) {
        return res.status(400).json('package not found');
    }
    else {
        return res.status(200).json(response);
    }
};
exports.DetailPackage = DetailPackage;
