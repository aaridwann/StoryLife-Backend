"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = void 0;
require('dotenv').config();
const mongoose_1 = __importDefault(require("mongoose"));
const url = process.env.DB_URL;
const connect = async () => {
    try {
        // await mongoose.connect('mongodb://localhost:27017/StoryLife')
        await mongoose_1.default.connect(`${url}`);
        // const db = mongoose.connection
        console.log('Connect Database');
    }
    catch (error) {
    }
};
exports.connect = connect;
