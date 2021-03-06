import { addPackage } from '../../Controller/Service/Package/AddPackage'
import { deletePackage } from '../../Controller/Service/Package/DeletePackage'
import { editPackage } from '../../Controller/Service/Package/EditPackage'
import { verify } from '../../MiddleWare/TokenMiddleware'
import { verifyVendor } from '../../MiddleWare/VendorMiddleware'
const Route = require('express').Router()


Route.post('/add', verify, verifyVendor, addPackage)
Route.put('/:id', verify, verifyVendor, editPackage)
Route.delete('/:id', verify, verifyVendor, deletePackage)

module.exports = Route