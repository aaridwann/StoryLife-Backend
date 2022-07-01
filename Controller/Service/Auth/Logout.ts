import { Response } from 'express'
import { userDb } from '../../../Models/UsersModels'
const jwt = require('jsonwebtoken')


export const logout = async (req: any, res: Response) => {
    // Initial token from headers Cookie
    let { refreshToken } = req.headers.cookie

    // Handler if not have cookie token
    if (!refreshToken) {
        return res.status(403).json({ status: 'You are already logout' })
    }
    // Decode process
    let decode = await jwt.verify(req.headers.cookie.refreshToken, process.env.REFRESH_TOKEN)

    // handler if signature token are not valid
    if (!decode) { return res.status(403) }

    // Delete refresh token from database user
    let response = await userDb.updateOne({ _id: decode._id }, { $set: { refreshToken: '' } })

    // Clear cookie
    res.clearCookie('refreshToken')

    // Return send json
    return res.status(201).send({ message: 'you are logout', data: response })
}