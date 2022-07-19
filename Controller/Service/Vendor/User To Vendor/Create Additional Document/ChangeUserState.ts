import { ObjectId } from "mongodb";
import { userDb } from "../../../../../Models/UsersModels";

export const ChangeUserState = async (userId: string): Promise<{ state: boolean, message: string }> => {
    try {
        const change = await userDb.updateOne({ _id: new ObjectId(userId) }, { $set: { vendor: true } })
        if (!change) {
            return { state: false, message: 'something error' }
        }
        return { state: true, message: 'ok' }
    } catch (error: any) {
        return { state: false, message: error.toString() }
    }
}


export const AbortUserState = async (userId: string): Promise<{ state: boolean, message: string }> => {
    try {
        const change = await userDb.updateOne({ _id: new ObjectId(userId) }, { $set: { vendor: false } })
        if (!change) {
            return { state: false, message: 'something error' }
        }
        return { state: true, message: 'ok' }
    } catch (error: any) {
        return { state: false, message: error.toString() }
    }
}