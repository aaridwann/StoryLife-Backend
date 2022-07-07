import { Response } from 'express'
import { ObjectId } from 'mongodb'
import { eventDb } from '../../../Models/EventModels'
import { packagedb } from '../../../Models/PackageModels'
import { userDb } from '../../../Models/UsersModels'
import { vendor } from '../../../Models/VendorsModels'
interface Request {
    user: {
        _id: string
    },
    query: {
        eventId: string,
        packageId: string
    },
    body: {
        quantity: string
        notes: string
    }
}

// 1. get data user <findOne>
// 2. get data package and update Sales < findOneAndUpdate >
// 3. get data vendor dari package < findOne >
// 4. get data event dan langsung edit 
// 1. vendor list dengan vendor dan package < findOneAndUpdate >
// 2. total cost
// 5. olah data user,event,package,vendor 
// 6. create data < updateOne >
// 7. create additional order & schedule <updateOne>
// 8. update vendor in eventList
// 9. jika 6 | 7 | 8 gagal abort 2, 4, 6, 7, 8




export const addBooking = async (req: Request, res: Response) => {
    if (!req.query.eventId || !req.query.packageId) {
        return res.status(400).json('query params url not found:: example= http://localhost:8000/booking/?packageId=<YOUR PACKAGE ID>&eventId=<YOUR EVENT ID>')
    }


    // 1. get user
    const user = await getUser(req.user._id)
    if (!user.state) return res.status(400).json(user)

    // 2. get package
    const pckg = await getPackage(req.query.packageId)
    if (!pckg.state) return res.status(400).json(pckg)
    
    // 3. get vendor
    const vendors = await getVendor(pckg.message.vendorId)
    if(!vendors.state) return res.status(400).json(vendors)

    return res.json(vendors)


}

export const getUser = async (userId: string): Promise<{ state: boolean, message: string | any }> => {
    try {
        let get = await userDb.findOne({ _id: new ObjectId(userId) }, { name: 1, phone: 1, address: 1, email: 1 })
        if (!get) {
            return { state: false, message: 'user not found' }
        }
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
        const get = await vendor.findOne({ vendorId: vendorId },{identity:0,bankAccount:0,image:0,state:0,balance:0,_id:0,__v:0})
        if (!get) return { state: false, message: 'vendor not found' }
        return { state: true, message: get }
    } catch (error: any) {
        return { state: false, message: error.toString() }
    }
}

export const getEvent = async (eventId: string): Promise<{ state: boolean, message: any }> => {
    try {
        const get = await eventDb.findOneAndUpdate({ event: { $elemMatch: { _id: new ObjectId(eventId), 'vendor.vendorCategory':'photography'} } }, { 'event.$': 1, _id: 0 })
        if (!get) return { state: false, message: 'event not found' }
        return { state: true, message: get.event[0] }
    } catch (error: any) {
        return { state: false, message: error.toString() }
    }
}