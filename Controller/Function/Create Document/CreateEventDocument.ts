import { eventDb } from '../../../Models/EventModels'

export const CreateEventDocument = async (id: string, email: string) => {

    try {
        new eventDb({ userId: id, clientEmail: email })
        .save((err: any) => {
            if (err) {
                return false
            }
            else {
                return true
            }
        })

    } catch (error) {
        return false
    }
}