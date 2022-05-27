import { Response } from 'express'
import { CreateBallanceAccount } from '../Controller/Function/Create Document/CreateBallanceAccount';
import { CreateFollowDb } from '../Controller/Function/Create Document/CreateFollowDb';
const bcrypt = require('bcrypt');
import { userDb } from '../Models/UsersModels'
const jwt = require('jsonwebtoken')

const privateKey = process.env.PRIVATE_KEY
interface User {
    name: string,
    email: string,
    password: string
}
interface Login {
    email: string
    password: string
}


export const register = async (req: { body: User }, res: Response) => {
    // Init name emai password from body
    const { name, email, password } = req.body

    // Verification data
    if (!name || !password || !email) {
        return res.status(400).json({ message: 'data kosong' })
    }

    // Hashing password
    let salt = 15
    let hashPassword = await bcrypt.hash(password.toString(), salt)

    try {
        // Input to user Database
        const response = new userDb({
            name: name.toLowerCase().trim(),
            password: hashPassword,
            email: email.trim(),
        })
            .save(async (err: string) => {
                if (err) {
                    // Return if error Or duplicate email
                    return res.status(400).json({ data: err, message: 'email sudah terdaftar' })

                } else {
                    // Create Follow Document
                    let createFollowDb = await CreateFollowDb('id')
                    // Create Ballance account Document
                    let createBallanceAccount = await CreateBallanceAccount(email, 'id')
                    return res.status(201).json({ data: { response, 'follow': createFollowDb, 'balance': createBallanceAccount }, message: 'success' })
                }
            })

    } catch (error) {
        return res.status(400).json(error)
    }


}

export const login = async (req: { body: Login }, res: Response) => {
    // Init email and password form body
    let { email, password } = req.body

    // Verificatiion email and body
    if (!email || !password) {
        return res.status(400).json({ message: 'Data harap diisi' })
    }

    try {
        // Find user
        const response = await userDb.findOne({ email: email })

        // handler if user not found
        if (!response) {
            // return console.log({ data: response, message: 'user tidak terdaftar' })
            return res.status(400).json({ data: response, message: 'user tidak terdaftar' })
        }

        // Compare password
        const compare = await bcrypt.compare(password, response.password)

        // handler if password not match
        if (!compare) {
            // return console.log({ data: compare, message: 'Password salah' })
            return res.status(400).json({ data: compare, message: 'Password salah' })
        }

        // Create Token
        const token = jwt.sign({ _id: response._id, name: response.name, email: response.email }, privateKey, { expiresIn: '1d' })

        // // Create Refresh token
        const refreshToken = jwt.sign({ _id: response._id, name: response.name, email: response.email }, process.env.REFRESH_TOKEN, { expiresIn: '1d' })

        // // Input Refresh token to dataBase
        await userDb.updateOne({ email: email }, { $set: { refreshToken: refreshToken } })

        // Send cookie
        res.cookie('refreshToken', refreshToken)

        // Send Json
        // return console.log({ token: token, message: 'success' })
        return res.status(200).json({ token: token, message: 'success' })

    } catch (error) {
        // return console.log(error)
        return res.status(500).json(error)
    }

}

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