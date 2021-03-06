"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const UsersModels_1 = require("../../../Models/UsersModels");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const privateKey = process.env.PRIVATE_KEY;
const login = async (req, res) => {
    // Init email and password form body
    let { email, password } = req.body;
    // Verificatiion email and body
    if (!email || !password) {
        return res.status(400).json({ message: 'Data harap diisi' });
    }
    try {
        // Find user
        const response = await UsersModels_1.userDb.findOne({ email: email });
        // handler if user not found
        if (!response) {
            // return console.log({ data: response, message: 'user tidak terdaftar' })
            return res.status(400).json({ data: response, message: 'user tidak terdaftar' });
        }
        // Compare password
        const compare = await bcrypt.compare(password, response.password);
        // handler if password not match
        if (!compare) {
            // return console.log({ data: compare, message: 'Password salah' })
            return res.status(400).json({ data: compare, message: 'Password salah' });
        }
        // Create Token
        const token = jwt.sign({ _id: response._id, name: response.name, email: response.email }, privateKey, { expiresIn: '1d' });
        // // Create Refresh token
        const refreshToken = jwt.sign({ _id: response._id, name: response.name, email: response.email }, process.env.REFRESH_TOKEN, { expiresIn: '1d' });
        // // Input Refresh token to dataBase
        await UsersModels_1.userDb.updateOne({ email: email }, { $set: { refreshToken: refreshToken } });
        // Send cookie
        res.cookie('refreshToken', refreshToken);
        // Send Json
        // return console.log({ token: token, message: 'success' })
        return res.status(200).json({ token: token, message: 'success' });
    }
    catch (error) {
        // return console.log(error)
        return res.status(500).json(error);
    }
};
exports.login = login;
