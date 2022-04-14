const bcrypt = require('bcrypt');
const userDb = require('../Models/UsersModels')
const jwt = require('jsonwebtoken')
const privateKey = process.env.PRIVATE_KEY
interface User {
    name:string,
    email:string, 
    password:string
}


export const register = async (req: any, res: any) => {
    const{name,email,password}:User = req.body
    if (!name || !password || password.toString().length < 3||!email) {
        return res.json({ message: 'data kosong' })
    }
    // let { password } = req.body
    let salt = 15
    let hashPassword = await bcrypt.hash(password, salt)

    try {
        const response = await new userDb({
            name: name.toLowerCase(),
            password: hashPassword,
            email: email.trim(),
        }).save((err: string) => {
            if (err) {
                return res.status(400).json({ data: err, message: 'email sudah terdaftar' })
            }
            return res.status(201).send({ data: response, message: 'success' })
        })

    } catch (error) {
        return res.json(error)
    }


}

export const login = async (req: any, res: any) => {
    let { email, password }:User = req.body
    if (!email || !password) {
        return res.status(400).send({ message: 'Data harap diisi' })
    }
    try {
        // Find user
        const response = await userDb.findOne({ email: email })
        if (!response) {
            return res.status(400).send({ data: response, message: 'user tidak terdaftar' })
        }
        // Compare password
        const compare = await bcrypt.compare(password, response.password)
        if (!compare) {
            return res.status(400).send({ data: compare, message: 'Password salah' })
        }
        // Create Token
        const token = jwt.sign({ _id: response._id, name: response.name, email: response.email }, privateKey, { expiresIn: '1d' })

        // // Create Refresh token
        const refreshToken = jwt.sign({ _id: response._id, name: response.name, email: response.email }, process.env.REFRESH_TOKEN, { expiresIn: '1d' })

        // // Input Refresh token to dataBase
        await userDb.updateOne({ email: email }, { $set: { refreshToken: refreshToken } })

        res.cookie('refreshToken', refreshToken, { httpOnly: true })
        res.send({ token: token, message: 'success' })

        // Cookie UNSOLVED


    } catch (error) {
        res.send({ message: error })
    }

}

export const refreshToken = async (req: any, res: any) => {
    if (!req.cookies.refreshToken) {
        return res.status(403).json('Please login')
    }
    const refresh = await jwt.verify(req.cookies.refreshToken, process.env.REFRESH_TOKEN)
    if (!refresh) {
        return res.status(403)
    }
    const accessToken = jwt.sign({ _id: refresh._id, name: refresh.name, email: refresh.email }, privateKey, { expiresIn: 60 })
    const refreshToken = jwt.sign({ _id: refresh._id, name: refresh.name, email: refresh.email }, process.env.REFRESH_TOKEN, { expiresIn: '1d' })
    await userDb.updateOne({ _id: refresh._id }, { $set: { refreshToken: refreshToken } })
    res.send({ accessToken: accessToken })
}

export const logout = async (req: any, res: any) => {
    let { refreshToken } = req.cookies
    if (!refreshToken) {
        return res.status(403).json({ status: 'You are already logout' })
    }
    let decode = await jwt.verify(req.cookies.refreshToken, process.env.REFRESH_TOKEN)
    if (!decode) { return res.status(403) }
    let response = await userDb.updateOne({ _id: decode._id }, { $set: { refreshToken: '' } })
    res.clearCookie('refreshToken')
    res.status(201).send({ message: 'you are logout', data: response })
}