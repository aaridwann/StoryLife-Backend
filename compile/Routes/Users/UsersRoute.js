"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UsersController_1 = require("../../Controller/Service/Users/UsersController");
const { verify } = require('../../MiddleWare/TokenMiddleware');
const express = require('express');
const router = express.Router();
router.get('/', verify, UsersController_1.getUser);
module.exports = router;
