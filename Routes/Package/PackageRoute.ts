const Route = require('express').Router()
const Paket = require('../../Controller/PackageController')
import { verify } from '../../MiddleWare/TokenMiddleware'
import {verifyVendor} from '../../MiddleWare/VendorMiddleware'

Route.post('/add', verify, verifyVendor,(req: any, res: any) => {
    const paket = new Paket(req, res)
    paket.addPackage(res)
})


module.exports = Route