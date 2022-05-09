import { Response } from 'express'
require('dotenv').config()
const jwt = require('jsonwebtoken')
const privateKey = process.env.PRIVATE_KEY
interface User {
    name: string
    email: string
    iat: number
    exp: number
}
interface Request {
    headers: {
        authorization: string
    }
    user: User
    cookies: string
}

export const verify = (req: Request, res: Response, next: any) => {
    if (!req.headers.authorization) {
        return res.status(400).json('Access Forbidden')
    }
    // const cookie = jwt.verify(req.cookies.refreshToken, process.env.REFRESH_TOKEN)
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(' ')[1]
    jwt.verify(token, privateKey, (err: any, decode: any) => {
        if (err) {
            return res.json(err)
        }
        else {
            req.user = decode
            return next()
        }
    })
    // next()
}