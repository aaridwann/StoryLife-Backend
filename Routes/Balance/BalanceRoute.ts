import middlewareAccount, { createBalance, transfer } from "../../Controller/BalanceController"

const route = require('express').Router()
const {verify} = require('../../MiddleWare/TokenMiddleware')
route.post('/create',verify,createBalance)
route.put('/transfer',verify, middlewareAccount ,transfer)

module.exports = route