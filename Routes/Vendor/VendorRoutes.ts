import { getFollow } from "../../Controller/Function/Follow/getFollow"
import { DetailPackage } from "../../Controller/Vendor/DetailPackage"
import { ServicePackage } from "../../Controller/Vendor/ServicePackage"
import { addVendor, getVendor, getVendorSchedule } from "../../Controller/VendorController"
const { verify } = require('../../MiddleWare/TokenMiddleware')
const route = require('express').Router()


route.post('/addVendor', verify, addVendor)
route.get('/', verify, getVendor)
route.get('/schedule', verify, getVendorSchedule)
route.get('/package', verify, ServicePackage)
route.get('/follow', verify, getFollow)
route.get('/package/detail', verify, DetailPackage)



module.exports = route