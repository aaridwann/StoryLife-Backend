import { GetVendors } from "../../Controller/Service/Vendor/Get Vendor/VendorFunction"

const route = require('express').Router()
const { verify } = require('../../MiddleWare/TokenMiddleware')

route.get('/', verify, GetVendors)
module.exports = route
