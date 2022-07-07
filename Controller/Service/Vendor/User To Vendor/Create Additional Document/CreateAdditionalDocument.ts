import { ChangeUserState } from "./ChangeUserState"
import { CreateOrderDocument } from "./CreateOrderDocument"
import { CreatePackageDocument } from "./CreatePackageDocument"
import { CreateScheduleDb } from "./CreateScheduleDocument"


export const CreateAdditionalDocument = async (userId: string, vendorName: string) => {
    try {
        const order = await CreateOrderDocument(userId, vendorName)
        const packageDb = await CreatePackageDocument(userId, vendorName)
        const schedule = await CreateScheduleDb(userId, vendorName)
        const vendorState = await ChangeUserState(userId)
        if (!order.state || !packageDb.state || !schedule.state || !vendorState.state) {
            return { state: false, message: 'create additional is failed', log: { order, packageDb, schedule, vendorState } }
        }
        return { state: true, message: 'ok' }
    }
    catch (err: any) {
        return { state: false, message: err.toString() }
    }

}