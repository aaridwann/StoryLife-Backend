import { getFollow } from "../../Controller/Service/Follow/getFollow"
import { DetailPackage } from "../../Controller/Service/Package/DetailPackage"
import { ServicePackage } from "../../Controller/Service/Package/GetServicePackage"
import { userToVendor } from '../../Controller/Service/Vendor/User To Vendor/userToVendor'
const { verify } = require('../../MiddleWare/TokenMiddleware')
const route = require('express').Router()


route.post('/addvendor', verify, userToVendor)
// route.get('/', verify, getVendor)
// route.get('/schedule', verify, getVendorSchedule)
route.get('/package', verify, ServicePackage)
route.get('/follow', verify, getFollow)
route.get('/package/detail', verify, DetailPackage)



module.exports = route