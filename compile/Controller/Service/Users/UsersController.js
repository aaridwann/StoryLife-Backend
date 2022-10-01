"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = void 0;
const mongodb_1 = require("mongodb");
const UsersModels_1 = require("../../../Models/UsersModels");
const getUser = async (req, res) => {
    if (!req.query.vendor || req.query.vendor == 'false') {
        req.query.vendor = false;
    }
    else {
        req.query.vendor = true;
    }
    try {
        const get = await UsersModels_1.userDb.aggregate([
            {
                $addFields: {
                    'userId': { $toString: '$_id' }
                }
            },
            {
                $lookup: {
                    from: 'follows',
                    localField: 'userId',
                    foreignField: 'userId',
                    as: 'follow'
                }
            },
            {
                $lookup: {
                    from: 'events',
                    localField: 'userId',
                    foreignField: 'userId',
                    as: 'event'
                }
            },
            {
                $match: {
                    $or: [
                        { _id: new mongodb_1.ObjectId(req.query.id) }, { name: req.query.name }, { vendor: req.query.vendor }
                    ]
                }
            },
            {
                $project: {
                    _id: '$_id',
                    name: '$name',
                    address: '$address',
                    vendor: '$vendor',
                    follow: { following: '$follow.following', follower: '$follow.follower' },
                    event: '$event.event'
                }
            },
            { $unwind: { path: '$follow', preserveNullAndEmptyArrays: true } },
            { $unwind: { path: '$event', preserveNullAndEmptyArrays: true } },
        ]);
        return !get ? res.status(400).json('user not found') : res.status(200).json(get);
    }
    catch (error) {
        return res.status(500).json(error);
    }
};
exports.getUser = getUser;
