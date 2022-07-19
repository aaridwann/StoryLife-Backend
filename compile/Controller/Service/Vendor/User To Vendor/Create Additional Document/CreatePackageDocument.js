"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbortPackageDocument = exports.CreatePackageDocument = void 0;
const PackageModels_1 = require("../../../../../Models/PackageModels");
const CreatePackageDocument = async (userId, vendorName) => {
    try {
        let create = new PackageModels_1.packagedb({
            vendorId: userId,
            vendorName: vendorName,
            package: []
        });
        const save = await create.save();
        if (!save) {
            return { state: false, message: 'vendor name has been registered' };
        }
        return { state: true, message: 'ok' };
    }
    catch (error) {
        return { state: false, message: error.toString() };
    }
};
exports.CreatePackageDocument = CreatePackageDocument;
const AbortPackageDocument = async (vendorId) => {
    try {
        const abort = await PackageModels_1.packagedb.deleteOne({ vendorId: vendorId });
        if (!abort) {
            return { state: false, message: 'something error' };
        }
        return { state: true, message: 'ok' };
    }
    catch (err) {
        return { state: false, message: err.toString() };
    }
};
exports.AbortPackageDocument = AbortPackageDocument;
