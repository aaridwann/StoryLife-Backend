import { followDb } from "../../../Models/FollowModels";
import { FollowModels } from "../../../Models/FollowModels";
import { Response } from "express";

export const CreateFollowDb = async (id: string, res?: Response) => {

    // Create Follow Document
    try {

        new followDb<FollowModels>({ userId: id, following: [], follower: [] }).save((err: any) => {
            if (err) {
                return  false
            } else {
                return true

            }
        })

    } catch (error) {
        return false
    }

}
