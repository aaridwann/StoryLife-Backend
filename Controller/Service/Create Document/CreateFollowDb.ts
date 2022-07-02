import { followDb } from "../../../Models/FollowModels";
import { FollowModels } from "../../../Models/FollowModels";
import { Response } from "express";

export const CreateFollowDb = async (id: string, username: string) => {
    // Create Follow Document
    try {
        let create = new followDb<FollowModels>({ userId: id, userName: username, following: [], follower: [] })
        let exec = await create.save()
        if (!exec) {
            return false
        } else {
            return true
        }
    } catch (error) {
        return false
    }

}
