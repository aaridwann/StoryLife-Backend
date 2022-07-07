import { BookingListInterface } from "../../../Models/BookingModels"
import { packagedb } from "../../../Models/PackageModels"
import { PackageListInterface } from '../../../Models/BookingModels'
import { ObjectId } from "mongodb"
import { Response } from "express"
const { userDb } = require('../../../Models/UsersModels')
const { vendor: vendorDb } = require('../../../Models/VendorsModels')
const { eventDb } = require('../../../Models/EventModels')

interface RequestAddbookingInterface {
    user: {
        _id: string
    }
    body: {
        // client: BookingListInterface['clientInformation'],
        vendor: BookingListInterface['vendorInformation'],
        booking: BookingListInterface['bookingInformation'],
        packages: PackageListInterface
    }
}

export const AddBookingFunction = async (req: RequestAddbookingInterface, res: Response) => {

    let { vendor, booking, packages } = req.body
    if (!vendor || !booking || !packages) {
        return res.status(400).json('Check your Request Body')
    }

    // stage 1 Validation user
    let user = await CheckClient(req.user._id)
    if (!user.state) {
        return res.status(400).json(user)
    }
    // stage 2 validation vendor
    let vendors = await CheckVendor(vendor.vendorId)
    if (!vendors.state) {
        return res.status(400).json(vendors)
    }
    // stage 3 check event
    let event = await CheckEvent(user.message._id, booking.eventName, booking.eventId)
    if (!event.state) {
        return res.status(400).json(event)
    }
    // Stage 4 Check package vendor
    let item = await CheckPackageVendor(vendors.message.vendorId, packages._id)
    if (!item.state) {
        return res.status(400).json(item)
    }
    // Stage 5 Check EventBookingVendor
    let CheckVendorBooking = CheckEventBookingVendor(event.message.vendor, vendors.message.vendorId)
    if (!CheckVendorBooking.state) {
        return res.status(400).json(CheckVendorBooking)
    }

    // Create Booking on BookingDb
    let write = await BookingWrite(user, vendors, event, item)
    return console.log(write)
    // return console.log({ client: user, vendor: vendors, event: event, package: item, checkVendor: CheckVendorBooking })
}

async function CheckClient(id: string): Promise<{ state: boolean, message: string | any }> {
    try {
        let res = await userDb.findOne({ _id: new ObjectId(id) })
        if (!res) {
            return { state: false, message: 'user not found' }
        } else {
            return { state: true, message: res }
        }
    } catch (error: any) {
        return { state: false, message: error.toString() }
    }
}

async function CheckVendor(id: string): Promise<{ state: boolean, message: string | any }> {
    try {
        let res = await vendorDb.findOne({ vendorId: id }, { identity: 0, _id: 0, bankAccount: 0, status: 0, balance: 0 })
        if (!res) {
            return { state: false, message: 'vendor not found' }
        }
        return { state: true, message: res }
    } catch (error: any) {
        return { state: false, message: error }
    }

}

async function CheckEvent(userId: string, eventName: string, eventId: string): Promise<{ state: boolean, message: string | any }> {
    if (!userId || !eventName || !eventId) {
        return { state: false, message: 'params Check Event Function tidak lengkap' }
    }
    try {
        let res = await eventDb.findOne({ userId: userId, 'eventList.eventName': eventName, 'eventList._id': eventId }, { 'eventList.$': 1 })
        if (!res) {
            return { state: false, message: 'event not found' }
        }
        return { state: true, message: res.eventList[0] }
    } catch (error: any) {
        return { state: false, message: error }
    }
}

async function CheckPackageVendor(vendorId: string, packageId: string): Promise<{ state: boolean, message: string | any }> {

    if (!vendorId || !packageId) {
        console.log('check params check package vendor function')
    }

    try {
        let res = await packagedb.findOne({ vendorId: vendorId, 'package._id': packageId }, { 'package.$': 1 })
        if (!res) {
            return { state: false, message: 'package not found' }
        }
        return { state: true, message: res.package[0] }
    } catch (error) {
        return { state: false, message: error }
    }
}

function CheckEventBookingVendor(event: any, vendorId: string): { state: boolean, message: string | any } {
    if (!event || !vendorId) {
        return { state: false, message: 'check your params' }
    }
    let check = event.find((x: { vendorId: string }) => x.vendorId === vendorId)
    if (!check) {
        return { state: true, message: 'vendor belum ada' }
    } else {
        return { state: false, message: 'vendor sudah ada' }
    }
}

async function BookingWrite(client: any, vendor: any, booking: any, packages: any): Promise<{ state: boolean, message: string | any }> {

    if (!client || !vendor || !booking || !packages) {
        return { state: false, message: 'check your params BookingWriteFunction' }
    }


    try {
        let res = await eventDb.findOne({ userId: client._id, 'eventList.vendor.vendorCategory': vendor.vendorCategory })
        let response = res.eventList.map((x: { vendor: any }) => x.vendor.find((x: { vendorCategory: string }) => x.vendorCategory == vendor.vendorCategory))[0]
        let query = await eventDb.updateOne({ 'eventList.vendor._id': response }, { $set: { 'eventList.vendor..vendorCategory': 'ngehekk' } })
        return query
    } catch (error: any) {
        return { state: false, message: error.toString() }
    }


}