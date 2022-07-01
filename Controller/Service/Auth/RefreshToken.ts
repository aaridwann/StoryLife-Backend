import { Response } from 'express'
import { userDb } from '../../../Models/UsersModels'
const jwt = require('jsonwebtoken')
const privateKey = process.env.PRIVATE_KEY


export const refreshToken = async (req: { cookies: { refreshToken: string } }, res: Response) => {
    // handler if not have cookie refresh token
    if (!req.cookies.refreshToken) {
        return res.status(403).json('Please login')
    }

    // Verify token proccess
    const refresh = await jwt.verify(req.cookies.refreshToken, process.env.REFRESH_TOKEN)

    // handler if signature crash
    if (!refresh) {
        return res.status(403)
    }
    // create new access Token from verify token
    const accessToken = jwt.sign({ _id: refresh._id, name: refresh.name, email: refresh.email }, privateKey, { expiresIn: 60 })

    // create new Refresh Token from verify token
    const refreshToken = jwt.sign({ _id: refresh._id, name: refresh.name, email: refresh.email }, process.env.REFRESH_TOKEN, { expiresIn: '1d' })

    // Update refresh token in database
    await userDb.updateOne({ _id: refresh._id }, { $set: { refreshToken: refreshToken } })

    // Send json Access Token 
    return res.send({ accessToken: accessToken })
}