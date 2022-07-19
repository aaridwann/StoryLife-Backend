import { addBooking } from '../../Controller/Service/Booking/AddBooking';
import ClientMiddleware from "../../MiddleWare/ClientMiddleware";
const route = require('express').Router();
const { verify } = require('../../MiddleWare/TokenMiddleware')

// use Query url packageId & eventId
route.post('/', verify, ClientMiddleware, addBooking)



module.exports = route