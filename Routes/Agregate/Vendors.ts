import { vendors } from "../../Controller/Aggregation/Vendors"

const route = require('express').Router()
const { verify } = require('../../MiddleWare/TokenMiddleware')

route.get('/', verify, vendors)
module.exports = route
