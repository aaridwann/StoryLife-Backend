"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFollow = void 0;
const FollowModels_1 = require("../../../Models/FollowModels");
const getFollow = async (req, res) => {
    let { id, method } = req.query;
    if (!id || !method) {
        return res.status(400).json('format fetching in query params Query: { id:<USERID>, method: <1 | 2 | 3> } , method explain = 1. for following only, 2. for follower only, 3. for following & follower only');
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
        if (!result)
            return res.status(400).json({ state: false, message: result });
        return res.status(200).json(result);
    }
    catch (error) {
        return res.status(500).json(error);
    }
};
exports.getFollow = getFollow;
