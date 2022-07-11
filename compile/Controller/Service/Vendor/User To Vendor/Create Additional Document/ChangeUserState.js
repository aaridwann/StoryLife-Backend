"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbortUserState = exports.ChangeUserState = void 0;
const mongodb_1 = require("mongodb");
const UsersModels_1 = require("../../../../../Models/UsersModels");
const ChangeUserState = async (userId) => {
    try {
        const change = await UsersModels_1.userDb.updateOne({ _id: new mongodb_1.ObjectId(userId) }, { $set: { vendor: true } });
        if (!change) {
            return { state: false, message: 'something error' };
        }
        return { state: true, message: 'ok' };
    }
    catch (error) {
        return { state: false, message: error.toString() };
    }
};
exports.ChangeUserState = ChangeUserState;
const AbortUserState = async (userId) => {
    try {
        const change = await UsersModels_1.userDb.updateOne({ _id: new mongodb_1.ObjectId(userId) }, { $set: { vendor: false } });
        if (!change) {
            return { state: false, message: 'something error' };
        }
        return { state: true, message: 'ok' };
    }
    catch (error) {
        return { state: false, message: error.toString() };
    }
};
exports.AbortUserState = AbortUserState;
