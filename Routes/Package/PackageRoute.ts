const Route = require('express').Router()
const Paket = require('../../Controller/Service/Package/Add Edit Delete Package Class/PackageController')
import { verify } from '../../MiddleWare/TokenMiddleware'
import {verifyVendor} from '../../MiddleWare/VendorMiddleware'

Route.post('/add', verify, verifyVendor,(req: any, res: any) => {
    const paket = new Paket(req, res)
    paket.addPackage(res)
})
Route.delete('/:id',verify,verifyVendor,(req:any,res:any) => {
    const paket = new Paket(req, res)
    paket.deletePackage(req,res)
})
Route.put('/:id',verify,verifyVendor,(req:any,res:any) => {
    const paket = new Paket(req,res)
    paket.editPackage(req,res)
})

module.exports = Route