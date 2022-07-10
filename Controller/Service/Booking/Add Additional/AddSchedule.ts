import { scheduleDb } from "../../../../Models/ScheduleVendorModels"


export const addSchedule = async (vendorId: string, eventId: string, eventName: string, eventDate: number) => {
    try {
        const push = await scheduleDb.updateOne({ vendorId: vendorId }, { $push: { scheduleList: { 'eventId': eventId, 'eventName': eventName, 'eventDate': eventDate } } })
        if (!push) return { state: false, message: 'add schedule failed' }
        return { state: true, message: 'success add schedule' }
    } catch (error: any) {
        return { state: false, message: error.toString() }
    }
}

export const abortSchedule = async (vendorId: string, eventId: string) => {
    try {
        const abort = await scheduleDb.updateOne({ vendorId: vendorId }, { $pull: { scheduleList: { eventId: eventId } } })
        if (!abort) return { state: false, message: 'abort schedule is failed' }
        return { state: true, message: 'abort schedule success' }
    } catch (error: any) {
        return { state: false, message: error.toString() }
    }
}