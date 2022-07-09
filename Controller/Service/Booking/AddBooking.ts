import { Response } from 'express'
import { ObjectId } from 'mongodb'
import { eventDb } from '../../../Models/EventModels'
import { packagedb } from '../../../Models/PackageModels'
import { userDb } from '../../../Models/UsersModels'
import { vendor } from '../../../Models/VendorsModels'
import { bookingDb, BookingListInterface } from '../../../Models/BookingModels'
interface Request {
    user: {
        _id: string
    },
    query: {
        eventId: string,
        packageId: string
    },
    body: {
        quantity: number
        notes: string
    }
}

// OKE ! 1. get data user <findOne>
// OKE ! 2. get data package and update Sales < findOneAndUpdate >
// OKE ! 3. get data vendor dari package < findOne >
// OKE ! 4. get data event dan langsung edit 
// OKE !    4.1. vendor list dengan vendor dan package < findOneAndUpdate >
// OKE !    4.2. total cost
// OKE ! 5. olah data user,event,package,vendor 
// OKE ! 6. create data BOOKING (PUSH) < updateOne >
// 7. create additional order & schedule <updateOne>
// 8. update vendor in eventList
// 9. jika 6 | 7 | 8 gagal abort 2, 4, 6, 7, 8
// 10. Create Middleware Booking vendor name in first line


// PR ADDING TOTAL & NOTES in data proccessing in package



export const addBooking = async (req: Request, res: Response) => {
    if (!req.query.eventId || !req.query.packageId) {
        return res.status(400).json('query params url not found:: example= http://localhost:8000/booking/?packageId=<YOUR PACKAGE ID>&eventId=<YOUR EVENT ID>')
    }


    // 1. get user
    const user = await getUser(req.user._id)
    if (!user.state) return res.status(400).json(user)

    // 2. get package
    // Return Array
    const pckg = await getPackage(req.query.packageId)
    if (!pckg.state) return res.status(400).json(pckg)

    // 3. get vendor
    const vendors = await getVendor(pckg.message.vendorId)
    if (!vendors.state) return res.status(400).json(vendors)

    // 4. Get and modify event Db 
    const event = await getEvent(req.query.eventId, vendors.message.vendorCategory, vendors.message, pckg.message.package[0])
    if (!event.state) return res.status(400).json(event)

    // 5. Proccessing Data
    const data = proccessingData(user.message, pckg.message.package[0], vendors.message, event.message, req.body.notes, req.body.quantity)
    if (!data) return res.status(400).json(data)

    // 6. Push data booking
    const pushData = await pushDataBooking(data.message)
    if (!pushData.state) return res.status(400).json(pushData)

    return res.json(pushData)


}

export const getUser = async (userId: string): Promise<{ state: boolean, message: string | any }> => {
    try {
        let get = await userDb.findOne({ _id: new ObjectId(userId) }, { name: 1, phone: 1, address: 1, email: 1 })
        if (!get) return { state: false, message: 'user not found' }
        return { state: true, message: get }
    } catch (error: any) {
        return { state: false, message: error.toString() }
    }
}

export const getPackage = async (packageId: string): Promise<{ state: boolean, message: any }> => {
    try {
        const get = await packagedb.findOneAndUpdate({ package: { $elemMatch: { _id: new ObjectId(packageId) } } }, { $inc: { 'package.$.sales': 1 } }, { new: true })
        if (!get) return { state: false, message: 'package not found' }
        return { state: true, message: get }
    } catch (error: any) {
        return { state: false, message: error.toString() }
    }
}

export const getVendor = async (vendorId: string): Promise<{ state: boolean, message: any }> => {
    try {
        const get = await vendor.findOne({ vendorId: vendorId }, { identity: 0, bankAccount: 0, image: 0, state: 0, balance: 0, _id: 0, __v: 0 })
        if (!get) return { state: false, message: 'vendor not found' }
        return { state: true, message: get }
    } catch (error: any) {
        return { state: false, message: error.toString() }
    }
}

export const getEvent = async (eventId: string, categoryVendor: string, dataVendor: any, pckg: any): Promise<{ state: boolean, message: any }> => {
    try {
        const get = await eventDb.findOneAndUpdate(
            // Filter
            {
                'event': {
                    $elemMatch: {
                        _id: new ObjectId(eventId),
                        'vendor.vendorCategory': categoryVendor
                    }
                }
            },
            // Update
            {
                $set: {
                    'event.$[inner].vendor.$[outer].vendorName': dataVendor.vendorName,
                    'event.$[inner].vendor.$[outer].vendorId': dataVendor.vendorId,
                    'event.$[inner].vendor.$[outer].vendorPhone': dataVendor.contact,
                },
                $push: {
                    'event.$[inner].vendor.$[outer].package': pckg,
                },
                $inc: {
                    'event.$[inner].totalCost': pckg.price
                }
            },
            // Options
            {
                returnNewDocument: true,
                'projection': {
                    'event.$': true,
                    _id: false
                },
                'arrayFilters': [
                    { 'inner._id': new ObjectId(eventId) },
                    { 'outer.vendorCategory': categoryVendor }
                ],
            })
        if (!get) return { state: false, message: 'vendor category not found please add category in event before' }

        return { state: true, message: get.event[0] }
    } catch (error: any) {
        return { state: false, message: error.toString() }
    }
}

export const proccessingData = (user: any, pckg: any, vendor: any, event: any, notes: string, qty: number) => {
    pckg['total'] = pckg.price * qty
    pckg['notes'] = notes

    // 1. init data Booking Information
    const bookingInformation: BookingListInterface['bookingInformation'] = {
        eventName: event.eventName,
        eventId: event._id.toString(),
        eventLocation: event.eventLocation,
        eventCategory: event.eventCategory,
        eventDate: event.eventDate,
        bookingDate: Date.now(),
        bookingStatus: false,
        paidStatus: false,
    }

    // 2. init data Vendor Information
    const vendorInformation: BookingListInterface['vendorInformation'] = {
        vendorId: vendor.vendorId,
        vendorName: vendor.vendorName,
        vendorAddress: vendor.address,
        vendorPhone: vendor.contact,
        vendorCategory: vendor.vendorCategory,
        package: [pckg]
    }

    // 3. init Client information
    const clientInformation: BookingListInterface['clientInformation'] = {
        clientId: user._id.toString(),
        clientName: user.name,
        clientAddress: user.address,
        clientPhone: user.phone,

    }


    return { state: true, message: { bookingInformation, vendorInformation, clientInformation } }
}

export const pushDataBooking = async (data: any): Promise<{ state: boolean, message: any, log?: any }> => {
    if (!data) return { state: false, message: 'something error', log: data }
    try {
        const push = await bookingDb.findOneAndUpdate({ userId: data.clientInformation.clientId }, { $push: { bookingList: data } }, { new: true })
        if (!push) return { state: false, message: 'something error' }
        return { state: true, message: push }
    } catch (error: any) {
        return { state: false, message: error.toString() }
    }

}