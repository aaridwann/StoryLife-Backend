import { eventDb } from '../../../Models/EventModels'
import { EventModelInterface } from '../../../Models/EventModels'

export const CreateEventDocument = async (id: string, username: string) => {
    try {
        let res = new eventDb<EventModelInterface>({ userId: id, userName: username, event: [] })
        let exec = await res.save()
        if (!exec) {
            return false
        }
        return true
    } catch (error) {
        return false
    }
}