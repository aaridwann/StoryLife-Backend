"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Login_1 = require("../../Controller/Service/Auth/Login");
const Logout_1 = require("../../Controller/Service/Auth/Logout");
const RefreshToken_1 = require("../../Controller/Service/Auth/RefreshToken");
const RegisterService_1 = require("../../Controller/Service/Auth/RegisterService");
const express = require('express');
const router = express.Router();
router.post('/refreshToken', RefreshToken_1.refreshToken);
router.post('/login', Login_1.login);
router.post('/register', RegisterService_1.RegisterService);
router.delete('/logout', Logout_1.logout);
module.exports = router;
