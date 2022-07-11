"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const setting = new mongoose_1.default.Schema({
    profilePicture: { type: String, default: '' }
});
module.exports = mongoose_1.default.model('setting', setting);
