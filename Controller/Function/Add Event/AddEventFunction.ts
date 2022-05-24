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

export const AddEventFunction = async (req: RequestAddEventFunctionInterface, res: Response) => {

    // Init category vendor
    let category = req.body.vendor.map((x: any) => {
        return { vendorCategory: x }
    })

    // Init data from body
    let data = {
        eventName: req.body.eventName,
        eventDate: req.body.eventDate,
        eventLocation: req.body.eventLocation,
        eventCategory: req.body.eventCategory,
        vendor: category,
        totalCost: req.body.totalCost
    }

    // Validation data
    let validatorData: undefined | { state: boolean, message: string } = await validationData(data)
    if (validatorData?.state == false) {
        // console.log('validator exit')
        return validatorData
    }
    // Validation Duplicate Event Function
    if (await ValidationDuplicateEvent(data.eventName, req.user._id) === false) {
        // return console.log('Event sudah ada')
        return 'Event sudah ada'
    }

    // Validation user is vendor or not and found
    let validatorUser = await validationUser(req.user._id)
    if (validatorUser.state == false) {
        return { state: false, message: validatorUser.message }
    }

    try {
        await new eventDb({ userId: req.user, event: data }).save((err: any) => {
            if (err) {
                return console.log(err)
            }
            return true
        })
    } catch (error) {
        return console.log(error)
    }
}

async function ValidationDuplicateEvent(eventName: string, userId: string) {
    let res = await eventDb.findOne({ userId: userId, 'event.eventName': eventName })
    if (res) {
        return false
    } else {
        return true
    }
}


async function validationData(data: any): Promise<undefined | { state: boolean, message: string }> {
    if (!data.eventName || !data.eventDate || !data.eventLocation || !data.eventCategory || !data.vendor) {
        return { state: false, message: 'check your input' }
    }
    return { state: true, message: '' }
}

async function validationUser(idUser: string) {

    try {
        let response = await userDb.findOne({ _id: `${idUser}` }, { vendor: 1 })
        if (response === null) {
            return { state: false, message: 'user not found' }
        } else if (response.vendor === true) {
            return { state: false, message: 'vendor cannot create event' }
        } else {
            return { state: true, message: 'user found and not as vendor' }
        }

    } catch (error) {
        return { state: false, message: error }
    }
}