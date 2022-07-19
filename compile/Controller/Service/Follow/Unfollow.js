"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.followBack = exports.removeFollower = exports.removeFollowing = exports.unfollow = void 0;
const FollowModels_1 = require("../../../Models/FollowModels");
//message 
const msg = (msg) => {
    return { state: false, message: msg };
};
const unfollow = async (req, res) => {
    if (req.params.id) {
        return res.status(400).json({ state: false, message: 'request params id not found' });
    }
    else if (req.user._id) {
        return res.status(500).json({ state: false, message: 'request user _id not found' });
    }
    // 1. remove following
    const remove = await (0, exports.removeFollowing)(req.user._id, req.params.id);
    if (!remove.state) {
        return res.status(400).json(remove.message);
    }
    // 2. Remove follower from id target
    const removeFollowers = await (0, exports.removeFollower)(req.user._id, req.params.id);
    if (!removeFollowers.state) {
        // if remove follower is fail than back to following
        await (0, exports.followBack)(req.user._id, req.params.id);
        return res.status(400).json(removeFollowers.message);
    }
    else {
        return res.status(201).json('success unfollowed');
    }
};
exports.unfollow = unfollow;
// 1. Remove following
const removeFollowing = async (idUser, idTarget) => {
    try {
        let res = await FollowModels_1.followDb.updateOne({ userId: idUser }, { $pull: { following: { _id: idTarget } } });
        if (!res.matchedCount) {
            return msg('user not found');
        }
        else if (!res.modifiedCount) {
            return msg('unfollow failed');
        }
        return { state: true, message: 'ok' };
    }
    catch (error) {
        return msg(error.toString());
    }
};
exports.removeFollowing = removeFollowing;
// 2. Remove Follower on target
const removeFollower = async (idUser, idTarget) => {
    try {
        let res = await FollowModels_1.followDb.updateOne({ userId: idTarget }, { $pull: { follower: { _id: idUser } } });
        if (!res.matchedCount) {
            return msg('user not found');
        }
        else if (!res.modifiedCount) {
            return msg('remove follower is failed');
        }
        return { state: true, message: 'ok' };
    }
    catch (error) {
        return msg(error.toString());
    }
};
exports.removeFollower = removeFollower;
// 3. When follow back is fail
const followBack = async (idUser, idTarget) => {
    try {
        let res = await FollowModels_1.followDb.updateOne({ userId: idUser }, { $push: { following: { _id: idTarget, timeStamps: Date.now() } } });
        if (!res.modifiedCount) {
            return msg('following back is fail');
        }
        return { state: true, message: 'following back is success' };
    }
    catch (error) {
        return msg(error.toString());
    }
};
exports.followBack = followBack;
