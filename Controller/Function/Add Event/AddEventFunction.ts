import axios from "axios"
import { Response } from "express"
import { ObjectId } from "mongodb"
const { eventDb } = require('../../../Models/EventModels')
import { EventList } from '../../../Models/EventModels'
import { VendorList } from '../../../Models/EventModels'
import { userDb } from "../../../Models/UsersModels"

interface RequestAddEventFunctionInterface {
    body: EventList
    user: {
        _id: string,
        token: string
    }
}
interface Data {
    eventName: string
    eventDate: number
    eventLocation: { street: string, city: string, province: string, state: string }
    eventCategory: string
    vendor: Array<VendorList>
    totalCost: number
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
    if (data?.state == false) {
        return res.status(400).json(data.message)
    }
    return res.json({message:"Input ok !",data:data})
    // Step 2
    // Validation Duplicate Event Function

    let validateDuplicateEvent = await ValidationDuplicateEvent(data?.eventName, req.user._id)
    if (validateDuplicateEvent.state === false) {
        return res.status(400).json(validateDuplicateEvent.message)
    }

    // Step 3
    // Validation user is vendor or not and found

    let validatorUser = await validationUser(req.user._id)
    if (validatorUser.state == false) {
        return res.status(400).json(validatorUser.message)
    }

    // Step 4
    // Insert into Db Events
    try {
        let insert = new eventDb({ userId: req.user, event: data })
        await insert.save()
        return res.status(201).json({ state: true, message: 'success create event' })
    } catch (error) {
        return res.status(400).json(error)
    }


}

// 
// Error di validation data function

async function validationData(req: any): Promise<{ state: boolean, message: any } | Format> {
    let format = {
        eventName: 'string',
        eventDate: 'number',
        eventLocation: { street: 'string', city: 'string', province: 'string', state: 'string' },
        eventCategory: 'string',
        vendor: ['vencorCategory', 'vencorCategory', 'vencorCategory'],
        totalCost: 'number'
    }

    if (!req.eventName || !req.eventDate || !req.eventLocation || !req.eventCategory || !req.vendor) {
        return { state: false, message: { error: 'check your input', format: format } }
    }
    // Init category vendor
    // let category = req.vendor.map((x: any) => {
    //     return { vendorCategory: x }
    // })

    // Init data from body
    let data: Format = {
        eventName: req.body.eventName,
        eventDate: req.body.eventDate,
        eventLocation: req.body.eventLocation,
        eventCategory: req.body.eventCategory,
        vendor:[{vendorCategory:'category'}]
        // vendor: req.body.map((x: any) => {
        //     return { vendorCategory: x }
        // })

    }

    return data
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
    } catch (error:any) {
        return { state: false, message: error.toString() }
    }
}