"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFollow = void 0;
const FollowModels_1 = require("../../../Models/FollowModels");
const getFollow = async (req, res) => {
    let { id, method } = req.query;
    if (!id) {
        return res.status(400).json('Id User tidak ada');
    }
    if (!method) {
        return res.status(400).json('Method tidak ada');
    }
    let met;
    if (method == 1) {
        met = { following: 1 };
    }
    else if (method == 2) {
        met = { follower: 1 };
    }
    else {
        met = { following: 1, follower: 1 };
    }
    try {
        let result = await FollowModels_1.followDb.findOne({ userId: id }, { _id: 0, userId: 1, ...met });
        {
            result == null && res.status(400).json({ message: 'user tidak ada', data: result });
        }
        return res.status(200).json(result);
    }
    catch (error) {
        return console.log(error);
    }
};
exports.getFollow = getFollow;
