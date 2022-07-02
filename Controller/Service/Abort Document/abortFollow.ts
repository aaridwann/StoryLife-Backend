import { followDb } from "../../../Models/FollowModels";

export const abortFollow = async (userId: string) => {
    try {
        let res = await followDb.deleteOne({ userId: userId })
        if (res.deletedCount) {
            return { state: true, message: 'abort follow is success' }
        } else {
            return { state: false, message: 'abort follow is failed' }
        }
    } catch (error: any) {
        return { state: false, message: error.toString() }
    }
}