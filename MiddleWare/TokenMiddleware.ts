require('dotenv').config()
const jwt = require('jsonwebtoken')
const privateKey = process.env.PRIVATE_KEY


export const verify = (req: any, res: any, next: any) => {
    const cookie = jwt.verify(req.cookies.refreshToken,process.env.REFRESH_TOKEN)
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(' ')[1]
    try {
        let currentToken = jwt.verify(token, privateKey, (err: any, decode: Object) => {
            if (err) { return res.status(403).json(err) }
            req.user = decode
            return decode
        })
        if(currentToken._id !== cookie._id){
            return res.json({message:'unAutorization'})
        }
        next()
    } catch (error) {
        res.json(error)
    }

}