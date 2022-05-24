import { refreshToken, login, register, logout } from "../../Controller/AuthController"
import { RegisterService } from "../../Controller/Function/Register/RegisterService";
import { registerValidator } from "../../Controller/Validator/RegisterValidator";
const express = require('express')
const router = express.Router()


router.post('/refreshToken', refreshToken);
router.post('/login', login)
router.post('/register',RegisterService)
router.delete('/logout', logout)

module.exports = router