import { Request, Response } from "express"
// import { cancelOrder } from "../../Controller/OrderController"
import { verify } from '../../MiddleWare/TokenMiddleware'
const route = require('express').Router()

route.get('/:id', (req:Request,res:Response) => {
    res.json("get jalan")
})
// route.put('/cancel', verify, cancelOrder)

module.exports = route