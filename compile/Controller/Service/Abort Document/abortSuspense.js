"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SuspenseModels_1 = __importDefault(require("../../../Models/SuspenseModels"));
const AbortSuspenseDb = async (id) => {
    try {
        const res = await SuspenseModels_1.default.deleteOne({ userId: id });
        if (res.deletedCount) {
            return { state: true, message: 'abort suspense is success' };
        }
        else {
            return { state: false, message: 'abort suspense is failed' };
        }
    }
    catch (error) {
        return { state: false, message: error.toString() };
    }
};
exports.default = AbortSuspenseDb;
