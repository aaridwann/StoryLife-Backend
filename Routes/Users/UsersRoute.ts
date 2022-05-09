import { ClientProfile, getallUsers, getUserById } from "../../Controller/UsersController"
const { verify } = require('../../MiddleWare/TokenMiddleware')
const express = require('express')
const router = express.Router()

router.get('/', verify, getallUsers)
router.get('/checkemail', getUserById)
router.get('/profile', verify, ClientProfile)

module.exports = router