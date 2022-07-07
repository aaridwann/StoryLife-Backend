import { GetVendors } from "../../Controller/Service/Vendor/Get Vendor/GetVendor"

const route = require('express').Router()
const { verify } = require('../../MiddleWare/TokenMiddleware')

route.get('/', verify, GetVendors)
module.exports = route
