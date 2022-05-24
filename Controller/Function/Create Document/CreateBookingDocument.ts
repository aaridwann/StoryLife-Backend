import { Response } from "express";
const { bookingDb } = require('../../../Models/BookingModels')



// Create Booking document in user first registered

export const CreateBookingDocument = async (id: string, res: Response) => {

    await new bookingDb({ userId: id }).save((err: string) => {
        if (err) {
            return false
        }
        return true

    })

}