"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verify = void 0;
require('dotenv').config();
const jwt = require('jsonwebtoken');
const privateKey = process.env.PRIVATE_KEY;
const verify = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(400).json({ state: false, message: 'Access Forbidden' });
    }
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    jwt.verify(token, privateKey, (err, decode) => {
        if (err) {
            return res.status(400).json({ state: false, message: err });
        }
        else {
            req.user = decode;
            return next();
        }
    });
};
exports.verify = verify;
