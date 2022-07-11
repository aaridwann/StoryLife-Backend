"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateFollowDb = void 0;
const FollowModels_1 = require("../../../Models/FollowModels");
const CreateFollowDb = async (id, username) => {
    // Create Follow Document
    try {
        let create = new FollowModels_1.followDb({ userId: id, userName: username, following: [], follower: [] });
        let exec = await create.save();
        if (!exec) {
            return false;
        }
        else {
            return true;
        }
    }
    catch (error) {
        return false;
    }
};
exports.CreateFollowDb = CreateFollowDb;
