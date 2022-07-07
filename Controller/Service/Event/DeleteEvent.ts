import { Response } from "express"
import { ObjectId } from "mongodb"
const { eventDb, categoryEvent } = require('../../../Models/EventModels')
interface Request {
    user: {
        _id: string
    }
    params: {
        id: string
    }
}


export const deleteEvent = async (req: Request, res: Response) => {
    if (!req.params.id) {
        return res.status(400).json({ state: false, message: 'request params id not found' })
    }
    try {
        const destroy = await eventDb.updateOne({ userId: req.user._id, 'event._id': new ObjectId(req.params.id) }, { $pull: { event: { _id: new ObjectId(req.params.id) } } })
        if (!destroy.modifiedCount) {
            return res.status(400).json({ state: false, message: 'event not found' })
        }
        return res.status(201).json({ state: true, message: 'event success delete' })
    } catch (error: any) {
        return res.status(500).json({ state: false, message: 'event not found' })
    }
}