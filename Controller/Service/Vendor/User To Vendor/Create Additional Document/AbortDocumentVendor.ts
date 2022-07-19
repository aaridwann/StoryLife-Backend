import { vendor } from "../../../../../Models/VendorsModels"
import { AbortUserState } from "./ChangeUserState"
import { AbortOrderDocument } from "./CreateOrderDocument"
import { AbortPackageDocument } from "./CreatePackageDocument"
import { AbortScheduleDocument } from "./CreateScheduleDocument"

export const AbortAdditionalDocument = async (userId: string) => {
    try {
        const order         = await AbortOrderDocument(userId)
        const packageDb     = await AbortPackageDocument(userId)
        const schedule      = await AbortScheduleDocument(userId)
        const user          = await AbortUserState(userId)
        const vendorState   = await AbortVendorsDocument(userId)
        if (!order.state || !packageDb.state || !schedule.state || !vendorState.state || !user.state) {
            return { state: false, message: 'create additional is failed' }
        }
        return { state: true, message: 'ok' }
    }
    catch (err: any) {
        return { state: false, message: err.toString() }
    }

}

export const AbortVendorsDocument = async (userId: string): Promise<{ state: boolean, message: string }> => {
    try {
        const abort = await vendor.deleteOne({ vendorId: userId })
        if (!abort) {
            return { state: false, message: 'something error' }
        }
        return { state: true, message: 'ok' }
    } catch (error: any) {
        return { state: false, message: error.toString() }
    }
}