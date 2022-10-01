"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshToken = void 0;
const UsersModels_1 = require("../../../Models/UsersModels");
const jwt = require('jsonwebtoken');
const refreshToken = async (req, res) => {
    const { refreshToken } = req.cookies;
    if (!refreshToken)
        return res.status(300).json({ message: 'token not found' });
    try {
        const find = await UsersModels_1.userDb.findOne({ refreshToken: refreshToken });
        if (!find)
            return res.status(403).json({ message: 'refresh token not found' });
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, decode) => {
            if (err)
                return res.status(500).json(err);
            const { name, email, _id } = decode;
            const token = jwt.sign({ _id, name, email }, process.env.PRIVATE_KEY, { expiresIn: '15s' });
            return res.status(201).json({ token: token });
        });
    }
    catch (error) {
        return res.status(500).json(error);
    }
};
exports.refreshToken = refreshToken;
