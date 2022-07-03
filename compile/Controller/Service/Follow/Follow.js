"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelFollowing = exports.addToFollower = exports.addToFollow = exports.checkFollow = exports.follow = void 0;
const FollowModels_1 = require("../../../Models/FollowModels");
// 1. check sudah follow atau belum !Complete
// 2. jika sudah return already follow !Complete
// 3. jika belum add to follow
// 4. jika gagal hapus kembali
// 5. jika berhasil tambah follower ke target
let failState = (message) => {
    return { state: false, message: message };
};
const follow = async (req, res) => {
    if (!req.user._id || !req.params.id) {
        // return failState('id user or id params not found')
        return res.status(400).json({ state: false, message: 'id user or id params not found' });
    }
    // 1. Check following
    let check = await (0, exports.checkFollow)(req.user._id, req.params.id);
    if (!check.state) {
        return res.status(400).json(check.message);
        // return failState(check.message)
    }
    // 2. Add to Following
    let addFollow = await (0, exports.addToFollow)(req.user._id, req.params.id);
    if (!addFollow.state) {
        return res.status(500).json(addFollow.message);
        // return failState(addFollow.message)
    }
    // 3. Add to Follower
    let addFollower = await (0, exports.addToFollower)(req.user._id, req.params.id);
    if (!addFollower.state) {
        // if Add to follower is failed do Cancel Following 
        await (0, exports.cancelFollowing)(req.user._id, req.params.id);
        return res.status(500).json(addFollower.message);
        // return failState(addFollower.message)
    }
    return res.status(201).json({ state: true, message: 'success follow' });
};
exports.follow = follow;
// Children function
// 1. Check follow Function
const checkFollow = async (idUser, idTarget) => {
    let res = await FollowModels_1.followDb.findOne({ userId: idUser }, { following: 1, _id: 0 });
    if (!res) {
        return { state: false, message: 'data is null' };
    }
    let check = res.following.map((x) => x._id).includes(idTarget);
    if (check) {
        return { state: false, message: 'you already follow' };
    }
    else {
        return { state: true, message: 'you not following him' };
    }
};
exports.checkFollow = checkFollow;
// 2. Add to Follow
const addToFollow = async (idUser, idTarget) => {
    try {
        await FollowModels_1.followDb.updateOne({ userId: idUser }, { $push: { following: { _id: idTarget, timeStamps: Date.now() } } });
        return { state: true, message: 'success follow' };
    }
    catch (error) {
        return { state: false, message: error.toString() };
    }
};
exports.addToFollow = addToFollow;
// 3. Add Follower
const addToFollower = async (idUser, idTarget) => {
    try {
        await FollowModels_1.followDb.updateOne({ userId: idTarget }, { $push: { follower: { _id: idUser, timeStamps: Date.now() } } });
        return { state: true, message: 'success add follower' };
    }
    catch (error) {
        return { state: false, message: error.toString() };
    }
};
exports.addToFollower = addToFollower;
// 4. Cancel Following
const cancelFollowing = async (idUser, idTarget) => {
    try {
        await FollowModels_1.followDb.updateOne({ userId: idUser }, { $pull: { following: { _id: idTarget } } });
        return { state: true, message: 'following has ben canceled' };
    }
    catch (error) {
        return { state: false, message: error.toString() };
    }
};
exports.cancelFollowing = cancelFollowing;
