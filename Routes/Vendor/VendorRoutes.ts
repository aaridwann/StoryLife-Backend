import { addVendor } from "../../Controller/VendorController"
const {verify} = require('../../MiddleWare/TokenMiddleware')
const route = require('express').Router()

route.post('/addVendor',verify,addVendor)


module.exports =route