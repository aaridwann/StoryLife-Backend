"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = void 0;
const UsersModels_1 = require("../../../Models/UsersModels");
const jwt = require('jsonwebtoken');
const logout = async (req, res) => {
    // Initial token from headers Cookie
    let { refreshToken } = req.cookies;
    // Handler if not have cookie token
    if (!refreshToken)
        return res.status(403).json({ status: 'You are already logout' });
    try {
        let response = await UsersModels_1.userDb.findOneAndUpdate({ refreshToken: refreshToken }, { $set: { refreshToken: '' } }, { address: 0, password: 0, refreshToken: 0, createdAt: 0, updatedAt: 0, vendor: 0, verify: 0, __v: 0 });
        if (!response)
            return res.status(403).json({ message: response });
        res.clearCookie('refreshToken');
        return res.status(201).send({ message: 'you are logout', data: response });
    }
    catch (error) {
        return res.status(500).json(error);
    }
};
exports.logout = logout;
