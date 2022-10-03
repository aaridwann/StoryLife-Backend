import { Response } from 'express'
import { userDb } from '../../../Models/UsersModels'
const jwt = require('jsonwebtoken')


export const logout = async (req: any, res: Response) => {
    // Initial token from headers Cookie
    let { refreshToken } = req.cookies

    // Handler if not have cookie token
    if (!refreshToken) return res.status(403).json({ status: 'You are already logout' })
    
    try {
        let response = await userDb.findOneAndUpdate({refreshToken: refreshToken }, { $set: { refreshToken: '' } },{address:0,password:0,refreshToken:0,createdAt:0,updatedAt:0,vendor:0,verify:0,__v:0})
        if(!response) return res.status(403).json({message:response})
        res.clearCookie('refreshToken')
        return res.status(201).send({ message: 'you are logout', data: response })
    } catch (error) {
        return res.status(500).json(error)       
    }
}