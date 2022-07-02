import { ObjectId } from "mongodb";
import { userDb } from "../../../Models/UsersModels";

export const abortUser = async (userId: string) => {
    try {
        let res = await userDb.deleteOne({ _id: new ObjectId(userId) })
        if (res.deletedCount) {
            return { state: true, message: 'abort user success' }
        } else {
            return { state: false, message: 'abort user failed' }
        }
    } catch (error: any) {
        return { state: false, message: error.toString() }
    }
}