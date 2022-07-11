"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAdditionalDocument = void 0;
const ChangeUserState_1 = require("./ChangeUserState");
const CreateOrderDocument_1 = require("./CreateOrderDocument");
const CreatePackageDocument_1 = require("./CreatePackageDocument");
const CreateScheduleDocument_1 = require("./CreateScheduleDocument");
const CreateAdditionalDocument = async (userId, vendorName) => {
    try {
        const order = await (0, CreateOrderDocument_1.CreateOrderDocument)(userId, vendorName);
        const packageDb = await (0, CreatePackageDocument_1.CreatePackageDocument)(userId, vendorName);
        const schedule = await (0, CreateScheduleDocument_1.CreateScheduleDb)(userId, vendorName);
        const vendorState = await (0, ChangeUserState_1.ChangeUserState)(userId);
        if (!order.state || !packageDb.state || !schedule.state || !vendorState.state) {
            return { state: false, message: 'create additional is failed', log: { order, packageDb, schedule, vendorState } };
        }
        return { state: true, message: 'ok' };
    }
    catch (err) {
        return { state: false, message: err.toString() };
    }
};
exports.CreateAdditionalDocument = CreateAdditionalDocument;
