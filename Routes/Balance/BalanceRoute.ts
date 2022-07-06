import { Transfer } from "../../Controller/Service/Ballance/Transfer"
import { verify } from "../../MiddleWare/TokenMiddleware"
const route = require('express').Router()

route.put('/transfer', verify, Transfer)

module.exports = route