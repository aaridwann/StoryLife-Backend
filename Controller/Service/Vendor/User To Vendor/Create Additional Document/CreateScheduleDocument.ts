import { scheduleDb } from "../../../../../Models/ScheduleVendorModels";

export const CreateScheduleDb = async (userId: string, vendorName: string): Promise<{ state: boolean, message: string }> => {

    try {
        const create = new scheduleDb({ vendorId: userId, vendorName: vendorName, scheduleList: [] })
        const save = await create.save()
        if (!save) {
            return { state: false, message: 'something error' }
        }
        return { state: true, message: 'ok' }
    } catch (error: any) {
        return { state: false, message: error.toString() }
    }

};

export const AbortScheduleDocument = async (vendorId: string): Promise<{ state: boolean, message: string }> => {
    try {
        const abort = await scheduleDb.deleteOne({ vendorId: vendorId })
        if (!abort) {
            return { state: false, message: 'something error' }
        }
        return { state: true, message: 'ok' }
    }
    catch (err: any) {
        return { state: false, message: err.toString() }
    }
}