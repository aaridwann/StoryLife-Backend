"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbortSales = void 0;
const PackageModels_1 = require("../../../../Models/PackageModels");
const AbortSales = async (packageId, quantity) => {
    try {
        const abort = await PackageModels_1.packagedb.findOneAndUpdate({ package: { $elemMatch: { _id: packageId } } }, { $inc: { 'package.$.sales': -quantity } }, { new: true });
        if (!abort)
            return { state: false, message: 'package is not found' };
        return { state: true, message: 'success abort sales' };
    }
    catch (error) {
        return { state: false, message: error };
    }
};
exports.AbortSales = AbortSales;
