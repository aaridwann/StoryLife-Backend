import { balanceDb } from "../../../Models/BalanceModels";

export const abortBallance = async (userId: string) => {
    try {
        let res = await balanceDb.deleteOne({ userId: userId })
        if (res.deletedCount) {
            return { state: true, message: 'abort ballance is success' }
        } else {
            return { state: false, message: 'something error' }
        }
    } catch (error: any) {
        return { state: false, message: error.toString() }
    }
}