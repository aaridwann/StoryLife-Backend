"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbortOrderDocument = exports.CreateOrderDocument = void 0;
const OrderModels_1 = require("../../../../../Models/OrderModels");
const CreateOrderDocument = async (userId, vendorName) => {
    try {
        const create = new OrderModels_1.orderDb({ vendorId: userId, vendorName: vendorName, orderList: [] });
        const save = await create.save();
        if (!save) {
            return { state: false, message: 'something error' };
        }
        return { state: true, message: 'ok' };
    }
    catch (err) {
        return { state: false, message: err.toString() };
    }
};
exports.CreateOrderDocument = CreateOrderDocument;
const AbortOrderDocument = async (vendorId) => {
    try {
        const abort = await OrderModels_1.orderDb.deleteOne({ vendorId: vendorId });
        if (!abort) {
            return { state: false, message: 'something error' };
        }
        return { state: true, message: 'ok' };
    }
    catch (err) {
        return { state: false, message: err.toString() };
    }
};
exports.AbortOrderDocument = AbortOrderDocument;
