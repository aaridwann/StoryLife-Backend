"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.abortBallance = void 0;
const BalanceModels_1 = require("../../../Models/BalanceModels");
const abortBallance = async (userId) => {
    try {
        let res = await BalanceModels_1.balanceDb.deleteOne({ userId: userId });
        if (res.deletedCount) {
            return { state: true, message: 'abort ballance is success' };
        }
        else {
            return { state: false, message: 'something error' };
        }
    }
    catch (error) {
        return { state: false, message: error.toString() };
    }
};
exports.abortBallance = abortBallance;
