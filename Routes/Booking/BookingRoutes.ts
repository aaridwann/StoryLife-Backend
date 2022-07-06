import { validatorBooking } from '../../Controller/Validator/validatorBooking'
import ClientMiddleware from "../../MiddleWare/ClientMiddleware";
const route = require('express').Router();
const { verify } = require('../../MiddleWare/TokenMiddleware')





// route.post('/', verify,ClientMiddleware, booking)

module.exports = route