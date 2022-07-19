"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AddBooking_1 = require("../../Controller/Service/Booking/AddBooking");
const ClientMiddleware_1 = __importDefault(require("../../MiddleWare/ClientMiddleware"));
const route = require('express').Router();
const { verify } = require('../../MiddleWare/TokenMiddleware');
// use Query url packageId & eventId
route.post('/', verify, ClientMiddleware_1.default, AddBooking_1.addBooking);
module.exports = route;
