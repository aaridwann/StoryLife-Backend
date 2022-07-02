import { eventDb } from '../../../Models/EventModels'
import { EventModelInterface } from '../../../Models/EventModels'

export const CreateEventDocument = async (id: string, username: string) => {
    try {
        let res = new eventDb<EventModelInterface>({ userId: id, userName: username, event: [] })
        await res.save()
        if (!res) {
            return false
        }
        return true
    } catch (error) {
        return false
    }
}