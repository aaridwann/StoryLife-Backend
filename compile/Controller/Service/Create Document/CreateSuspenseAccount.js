"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SuspenseModels_1 = __importDefault(require("../../../Models/SuspenseModels"));
const CreateSuspenseDb = async (id) => {
    try {
        const create = await new SuspenseModels_1.default({ userId: id }).save();
        if (!create)
            return false;
        return true;
    }
    catch (error) {
        console.log(error);
        return false;
    }
};
exports.default = CreateSuspenseDb;
