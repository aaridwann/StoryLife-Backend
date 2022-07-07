import { Response } from "express"
const { eventDb } = require('../../../Models/EventModels')
import { EventList } from '../../../Models/EventModels'
import { userDb } from "../../../Models/UsersModels"

interface RequestAddEventFunctionInterface {
    body: EventList
    user: {
        _id: string,
        token: string
    }
}

type Format = {
    eventName: string,
    eventDate: number,
    eventLocation: { street: string, city: string, province: string, state: string }
    eventCategory: string
    vendor: Array<{ vendorCategory: string }>
}


export const AddEventFunction = async (req: RequestAddEventFunctionInterface, res: Response) => {

    // Step 1
    // Validation data
    let data: any = await validationData(req.body)
    if (!data.state) {
        return res.status(400).json(data)
    }

    // Step 2
    // Validation Duplicate Event Function
    let validateDuplicateEvent = await ValidationDuplicateEvent(data.message.eventName, req.user._id)
    if (validateDuplicateEvent.state === false) {
        return res.status(400).json({ state: false, message: validateDuplicateEvent.message })
    }

    // Step 3
    // Validation user is vendor or not and found
    let validatorUser = await validationUser(req.user._id)
    if (validatorUser.state == false) {
        return res.status(400).json({ stat: false, message: validatorUser.message })
    }

    // Step 4
    // Insert into Db Events
    try {
        let insert = new eventDb({ userId: req.user, event: data.message })
        const save = await insert.save()
        if (!save) {
            return res.status(500).json({ state: false, message: 'something error' })
        }
        return res.status(201).json({ state: true, message: 'success create event' })
    } catch (error) {
        return res.status(400).json({ state: false, message: error })
    }

}

// Child Function //

async function validationData(req: any): Promise<{ state: boolean, message: any } | Format> {

    let format = {
        eventName: 'string',
        eventDate: 'number',
        eventLocation: { street: 'string', city: 'string', province: 'string', state: 'string' },
        eventCategory: 'string',
        vendor: ['vencorCategory', 'vencorCategory', 'vencorCategory'],
    }

    if (!req.eventName || !req.eventDate || !req.eventLocation || !req.eventCategory || !req.vendor) {
        return { state: false, message: { error: 'check your input', format: format } }
    }
    // Init category vendor
    let category = req.vendor.map((x: any) => {
        return { vendorCategory: x }
    })

    // Formater date
    let date = (date: string): number => {
        let ml = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december']
        let month = ml.indexOf(date.split(' ')[1])
        if (month == -1) {
            return 0
        }
        let data = new Date(parseInt(date.split(' ')[2]), month, parseInt(date.split(' ')[0])).getTime()
        return data
    }

    if (date(req.eventDate) == 0) {
        return { state: false, message: 'check date month or year format' }
    }

    // Init data from body
    let data: Format = {
        eventName: req.eventName,
        eventDate: date(req.eventDate),
        eventLocation: req.eventLocation,
        eventCategory: req.eventCategory,
        vendor: category
    }

    return { state: true, message: data }
}

async function ValidationDuplicateEvent(eventName: string, userId: string) {
    let res = await eventDb.findOne({ userId: userId, 'event.eventName': eventName })
    if (res) {
        return { state: false, message: 'name event duplicate' }
    } else {
        return { state: true }
    }
}

async function validationUser(idUser: string): Promise<{ state: boolean, message?: string }> {

    try {
        let response = await userDb.findOne({ _id: `${idUser}` }, { vendor: 1 })
        if (response === null) {
            return { state: false, message: 'user not found' }
        } else if (response.vendor === true) {
            return { state: false, message: 'vendor cannot create event' }
        } else {
            return { state: true }
        }
    } catch (error: any) {
        return { state: false, message: error.toString() }
    }
}

