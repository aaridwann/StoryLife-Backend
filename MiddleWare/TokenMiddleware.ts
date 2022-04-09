require('dotenv').config()
const jwt = require('jsonwebtoken')
const privateKey = process.env.PRIVATE_KEY


export const verify = (req: any, res: any, next: any) => {
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(' ')[1]

    jwt.verify(token, privateKey, (err: any, decode: Object) => {
        if (err) { return res.status(403).json(err) }
        req.user = decode
        next()
    })


}