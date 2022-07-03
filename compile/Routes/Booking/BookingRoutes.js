"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BookingController_1 = require("../../Controller/BookingController");
const ClientMiddleware_1 = __importDefault(require("../../MiddleWare/ClientMiddleware"));
const route = require('express').Router();
const { verify } = require('../../MiddleWare/TokenMiddleware');
route.post('/', verify, ClientMiddleware_1.default, BookingController_1.booking);
module.exports = route;
