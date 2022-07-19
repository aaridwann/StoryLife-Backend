import { getUser } from "../../Controller/Service/Users/UsersController"
const { verify } = require('../../MiddleWare/TokenMiddleware')
const express = require('express')
const router = express.Router()

router.get('/', verify, getUser)

module.exports = router