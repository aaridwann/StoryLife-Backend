import { followDb } from "../../Models/FollowModels";
import { FollowModels } from "../../Models/FollowModels";
import { Response } from "express";

export const CreateFollowDb = async (email: string, userDb: any, res?: Response) => {

    // Find by email
    let find = await userDb.findOne({ email: email }, { _id: 1 })

    // Inital id from finding email
    let id = find.id.toString()

    // Create Follow Document
    try {

        new followDb<FollowModels>({ userId: id, following: [], follower: [] }).save((err) => {
            if (err) {
                return { message: 'Something error', data: err }
            }
            return { message: 'Success Created', code: 200 }
        })

    } catch (error) {
        return console.log(error)
    }

}
