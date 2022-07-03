"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { userDb } = require('../Models/UsersModels');
async function ClientMiddleware(req, res, next) {
    // init id from request
    let id = req.user._id;
    // Find users with vendor state false
    const client = await userDb.findOne({ _id: id, vendor: false });
    // handler if status vendor true
    if (!client) {
        return res.status(400).json('Anda adalah Vendor tidak bisa booking');
    }
    next();
}
exports.default = ClientMiddleware;
