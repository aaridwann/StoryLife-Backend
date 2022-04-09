import { refreshToken, login, register, logout } from "../../Controller/AuthController"

const express = require('express')
const router = express.Router()

router.post('/refreshToken', refreshToken);
router.post('/login', login)
router.post('/register', register)
router.delete('/logout', logout)

module.exports = router