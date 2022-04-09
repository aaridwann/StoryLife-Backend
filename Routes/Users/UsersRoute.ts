import { getallUsers } from "../../Controller/UsersController"
const {verify} = require('../../MiddleWare/TokenMiddleware')
const express = require('express')
const router = express.Router()

router.get('/',verify,getallUsers)

module.exports = router