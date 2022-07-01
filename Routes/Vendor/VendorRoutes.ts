import { getFollow } from "../../Controller/Service/Follow/getFollow"
import { DetailPackage } from "../../Controller/Vendor/DetailPackage"
import { ServicePackage } from "../../Controller/Vendor/ServicePackage"
import { getVendor, getVendorSchedule } from "../../Controller/VendorController"
import { userToVendor } from '../../Controller/Service/Tobe Vendor/userToVendor'
const { verify } = require('../../MiddleWare/TokenMiddleware')
const route = require('express').Router()


route.post('/addvendor', verify, userToVendor)
route.get('/', verify, getVendor)
route.get('/schedule', verify, getVendorSchedule)
route.get('/package', verify, ServicePackage)
route.get('/follow', verify, getFollow)
route.get('/package/detail', verify, DetailPackage)



module.exports = route