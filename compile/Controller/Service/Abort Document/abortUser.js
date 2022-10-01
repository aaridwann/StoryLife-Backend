"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.abortUser = void 0;
const mongodb_1 = require("mongodb");
const UsersModels_1 = require("../../../Models/UsersModels");
const abortUser = async (userId) => {
    try {
        let res = await UsersModels_1.userDb.deleteOne({ _id: new mongodb_1.ObjectId(userId) });
        if (res.deletedCount) {
            return { state: true, message: 'abort user success' };
        }
        else {
            return { state: false, message: 'abort user failed' };
        }
    }
    catch (error) {
        return { state: false, message: error.toString() };
    }
};
exports.abortUser = abortUser;
