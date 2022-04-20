import { addVendor, getVendor, getVendorSchedule } from "../../Controller/VendorController"
const { verify } = require('../../MiddleWare/TokenMiddleware')
const route = require('express').Router()


route.post('/addVendor', verify, addVendor)
route.get('/', verify, getVendor)
route.get('/schedule', verify, getVendorSchedule)



module.exports = route