import { login } from "../../Controller/Service/Auth/Login";
import { logout } from "../../Controller/Service/Auth/Logout";
import { refreshToken } from '../../Controller/Service/Auth/RefreshToken';
import { RegisterService } from "../../Controller/Service/Auth/RegisterService";
const express = require('express')
const router = express.Router()


router.get('/refreshToken', refreshToken);
router.post('/login', login)
router.post('/register', RegisterService)
router.delete('/logout', logout)

module.exports = router