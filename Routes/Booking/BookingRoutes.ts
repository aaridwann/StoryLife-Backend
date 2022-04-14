import { booking } from "../../Controller/BookingController";
import { validatorBooking } from '../../Controller/Validator/validatorBooking'
const route = require('express').Router();
const { verify } = require('../../MiddleWare/TokenMiddleware')





route.post('/', verify, booking)

module.exports = route