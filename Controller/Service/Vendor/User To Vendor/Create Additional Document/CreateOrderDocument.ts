import { orderDb } from "../../../../../Models/OrderModels";

export const CreateOrderDocument = async (userId: string, vendorName: string): Promise<{ state: boolean, message: string }> => {

    try {
        const create = new orderDb({ vendorId: userId, vendorName: vendorName, orderList: [] })
        const save = await create.save()
        if (!save) {
            return { state: false, message: 'something error' }
        }
        return { state: true, message: 'ok' }
    } catch (err: any) {
        return { state: false, message: err.toString() }
    }


}

export const AbortOrderDocument = async (vendorId: string): Promise<{ state: boolean, message: string }> => {
    try {
        const abort = await orderDb.deleteOne({ vendorId: vendorId })
        if (!abort) {
            return { state: false, message: 'something error' }
        }
        return { state: true, message: 'ok' }
    }
    catch (err: any) {
        return { state: false, message: err.toString() }
    }
}
