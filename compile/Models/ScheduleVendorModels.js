"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scheduleDb = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const schedule = new mongoose_1.default.Schema({
    vendorId: { type: String, required: true, unique: true },
    vendorName: { type: String, required: true, unique: true },
    scheduleList: [
        {
            eventId: { type: String },
            eventName: { type: String },
            eventDate: { type: Number }
        }
    ]
});
exports.scheduleDb = mongoose_1.default.model('schedule', schedule);
