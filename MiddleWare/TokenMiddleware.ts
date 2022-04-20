require('dotenv').config()
const jwt = require('jsonwebtoken')
const privateKey = process.env.PRIVATE_KEY


export const verify = (req: any, res: any, next: any) => {
    if (!req.cookies.refreshToken || !req.headers.authorization) {
        return res.status(400).json('Access Forbidden')
    }
    const cookie = jwt.verify(req.cookies.refreshToken, process.env.REFRESH_TOKEN)
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(' ')[1]
    try {
        let currentToken = jwt.verify(token, privateKey, (err: any, decode: Object) => {
            if (err) { res.status(403).json(err) }
            return decode
        })
        if (currentToken._id !== cookie._id) {
            return res.json({ message: 'unAutorization' })
        }
        req.user = currentToken
        next()
    } catch (error) {
        res.json(error)
    }

}