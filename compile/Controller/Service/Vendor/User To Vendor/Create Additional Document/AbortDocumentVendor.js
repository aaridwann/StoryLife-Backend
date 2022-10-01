"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbortVendorsDocument = exports.AbortAdditionalDocument = void 0;
const VendorsModels_1 = require("../../../../../Models/VendorsModels");
const ChangeUserState_1 = require("./ChangeUserState");
const CreateOrderDocument_1 = require("./CreateOrderDocument");
const CreatePackageDocument_1 = require("./CreatePackageDocument");
const CreateScheduleDocument_1 = require("./CreateScheduleDocument");
const AbortAdditionalDocument = async (userId) => {
    try {
        const order = await (0, CreateOrderDocument_1.AbortOrderDocument)(userId);
        const packageDb = await (0, CreatePackageDocument_1.AbortPackageDocument)(userId);
        const schedule = await (0, CreateScheduleDocument_1.AbortScheduleDocument)(userId);
        const user = await (0, ChangeUserState_1.AbortUserState)(userId);
        const vendorState = await (0, exports.AbortVendorsDocument)(userId);
        if (!order.state || !packageDb.state || !schedule.state || !vendorState.state || !user.state) {
            return { state: false, message: 'create additional is failed' };
        }
        return { state: true, message: 'ok' };
    }
    catch (err) {
        return { state: false, message: err.toString() };
    }
};
exports.AbortAdditionalDocument = AbortAdditionalDocument;
const AbortVendorsDocument = async (userId) => {
    try {
        const abort = await VendorsModels_1.vendor.deleteOne({ vendorId: userId });
        if (!abort) {
            return { state: false, message: 'something error' };
        }
        return { state: true, message: 'ok' };
    }
    catch (error) {
        return { state: false, message: error.toString() };
    }
};
exports.AbortVendorsDocument = AbortVendorsDocument;
