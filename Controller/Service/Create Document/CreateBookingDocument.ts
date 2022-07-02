import { bookingDb } from "../../../Models/BookingModels"

// Create Booking document in user first registered

export const CreateBookingDocument = async (id: string, username: string) => {

    try {
        let res = new bookingDb({ userId: id, userName: username })
        await res.save()
        if (!res) {
            return false
        }
        return true
    } catch (error) {
        return false
    }



}
