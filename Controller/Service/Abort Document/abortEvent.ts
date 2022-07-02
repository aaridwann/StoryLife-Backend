import { eventDb } from "../../../Models/EventModels";


export const abortEvent = async (userId: string) => {
    try {
        let res = await eventDb.deleteOne({ userId: userId })
        if (res.deletedCount) {
            return { state: true, message: 'abort event is success' }
        } else {
            return { state: false, message: 'abort event is failed' }
        }
    } catch (error: any) {
        return { state: false, message: error.toString() }
    }
}