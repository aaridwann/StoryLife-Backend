import { bookingDb } from '../../../Models/BookingModels'



export const abortBooking = async (userId: string) => {
    try {
        let res = await bookingDb.deleteOne({ userId: userId })
        if (res.deletedCount) {
            return { state: true, message: 'abort booking is success' }
        } else {
            return { state: false, message: 'abort booking is failed' }
        }
    } catch (error: any) {
        return { state: false, message: error.toString() }
    }
}

