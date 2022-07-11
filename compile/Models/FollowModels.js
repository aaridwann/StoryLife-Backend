"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.followDb = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const follow = new mongoose_1.default.Schema({
    userId: { type: String, required: true, unique: true },
    userName: { type: String, required: true },
    following: [{ _id: { type: String }, timeStamps: { type: Number } }],
    follower: [{ _id: { type: String }, timeStamps: { type: Number } }]
});
exports.followDb = mongoose_1.default.model('follow', follow);
