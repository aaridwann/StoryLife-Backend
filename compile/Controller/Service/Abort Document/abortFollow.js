"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.abortFollow = void 0;
const FollowModels_1 = require("../../../Models/FollowModels");
const abortFollow = async (userId) => {
    try {
        let res = await FollowModels_1.followDb.deleteOne({ userId: userId });
        if (res.deletedCount) {
            return { state: true, message: 'abort follow is success' };
        }
        else {
            return { state: false, message: 'abort follow is failed' };
        }
    }
    catch (error) {
        return { state: false, message: error.toString() };
    }
};
exports.abortFollow = abortFollow;
