const { bookingDb } = require('../../Models/BookingModels')
const { userDb } = require('../../Models/UsersModels')
const { vendor: vendorDb } = require('../../Models/VendorsModels')
const { project: projectDb } = require('../../Models/ProjectModels')
import { BookingListInterface } from "../../Models/BookingModels"

interface RequestAddbookingInterface {
    body: {
        client: BookingListInterface['clientInformation'],
        vendor: BookingListInterface['vendorInformation'],
        booking: BookingListInterface['bookingInformation']
    }
}

export const AddBookingFunction = async (req: RequestAddbookingInterface) => {
    let { client, vendor, booking } = req.body

    // stage 1 Validation user
    let user = await CheckClient(client.clientId)
    // stage 2 validation vendor
    let vendors = await CheckVendor(vendor.vendorId)

    return console.log({ client: user, vendor: vendors })
}

async function CheckClient(id: string) {
    try {
        let res = await userDb.findOne({ _id: id })
        if (!res) {
            return false
        } else {
            return res
        }
    } catch (error) {
        return false
    }
}

async function CheckVendor(id: string) {
    try {
        let res = await vendorDb.findOne({ vendorId: id })
        return res
    } catch (error) {
        return error
    }

}

async function CheckEvent(id: string) {
    // let res = await projectDb.findOne({_id:})
}