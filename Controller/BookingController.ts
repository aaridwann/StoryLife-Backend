const bookingDb = require('../Models/BookingModels')
const projectDb = require('../Models/ProjectModels')
const vendorDb = require('../Models/VendorsModels')
const userDb = require('../Models/UsersModels')
const packageDb = require("../Models/PackageModels")
import { Response } from 'express'
import { ObjectId } from 'mongodb'
import { User } from './ProjectController'
const { addVendor } = require('../Controller/ProjectController')
const { addOrder } = require('../Controller/OrderController')
const Schedule = require('../Controller/ScheduleController')

const categoryVendor = ['photography', 'videography', 'makeup artist', 'gawn', 'decoration', 'invitation', 'venue', 'mc', 'entertainment', 'wedding service']

interface Body {
    eventId: string
    eventName: string
    vendorId: string
    vendorName: string
    packageId: string,
    notes: string,
    quantity: number
}
export interface Package {
    _id: string
    packageName: String
    details: String
    price: number
    discount: number
    quantity: number
    total: number
}
export interface BookingInformation {
    eventName: String
    eventId: String
    location: String
    bookingDate: Date
    eventDate: Date
    bookingStatus: 'pending' | 'accepted' | 'rejected'
    paidStatus: Boolean
}
export interface Vendor {
    vendorId: String
    vendorName: String
    vendorAddress: String
    vendorPhone: String[]
    vendorCategory: typeof categoryVendor
    notes: String
    package: Array<Package>
}
export interface Client {
    clientId: String
    clientName: String
    clientAddress: String
    clientPhone: String
}
interface Request {
    headers: {
        cookie: {
            id: string
        }
    },
    user: User,
    body: Body
}

export const booking = async (req: Request, res: Response) => {


    // Initial _id by middleware JWT
    let { _id } = req.user

    // Initial Body by request body
    let data: Body = {
        eventId: req.body.eventId,
        eventName: req.body.eventName,
        vendorId: req.body.vendorId,
        vendorName: req.body.vendorName,
        packageId: req.body.packageId,
        notes: req.body.notes,
        quantity: req.body.quantity
    }

    // // Validator Data
    if (!data.eventId || !req.body.quantity || !data.eventName || !data.vendorId || !data.vendorName || !data.packageId) {
        return res.json({ message: 'Data tidak lengkap', data: "eventId,eventName,vendorId,vendorName,packageId,notes,quantity" })
    }

    // Cek Client
    const checkClient = await userDb.findOne({ _id: _id })
    if (!checkClient) {
        return res.status(400).json({ data: checkClient, message: 'Client tidak ada' })
    }
    // cek event 
    const checkEvent = await projectDb.findOne({ _id: data.eventId, name: data.eventName, userId: _id })
    if (!checkEvent) {
        return res.status(400).json({ message: 'Event tidak ada harap membuat project terlebih dahulu' })
    }
    // cek vendor
    const checkVendor = await vendorDb.findOne({ vendorId: data.vendorId, name: data.vendorName })
    if (!checkVendor) { return res.status(400).json({ message: 'Vendor tidak ada' }) }

    // Cek package
    let checkPackage: Package = {
        _id: '',
        packageName: '',
        details: '',
        price: 0,
        discount: 0,
        quantity: 0,
        total: 0
    };
    try {
        let cekPackageQuery = await packageDb.findOne({ vendorId: data.vendorId, 'package._id': new ObjectId(data.packageId) }, { 'package.$': 1, _id: 0 })
        checkPackage = cekPackageQuery.package[0]
        checkPackage.price = checkPackage.price * data.quantity
        checkPackage.quantity = data.quantity
    } catch (error) {
        return res.status(400).json({ message: error, data: 'Package Tidak ada' })
    }


    // Initial Data from Check Package !!!
    const packageList: Package = {
        _id: checkPackage._id,
        packageName: checkPackage.packageName,
        details: checkPackage.details,
        price: checkPackage.price,
        discount: checkPackage.discount,
        quantity: data.quantity,
        total: checkPackage.price * data.quantity,
    }
    const bookingInformation: BookingInformation = {
        eventName: checkEvent.name,
        eventId: checkEvent._id,
        location: checkEvent.location,
        bookingDate: new Date(),
        eventDate: checkEvent.date,
        bookingStatus: 'pending',
        paidStatus: false
    }
    const vendorInformation: Vendor = {
        vendorId: checkVendor.vendorId,
        vendorName: checkVendor.name,
        vendorAddress: checkVendor.address,
        vendorPhone: [checkVendor.phone1, checkVendor.phone1],
        vendorCategory: checkVendor.category,
        notes: data.notes,
        package: [packageList]
    }
    const client: Client = {
        clientId: checkClient._id,
        clientName: checkClient.name,
        clientAddress: checkClient.address,
        clientPhone: checkClient.phone
    }


    // Filter Vendor Sudah booking atau belum
    let filter = await projectDb.findOne({ _id: bookingInformation.eventId, 'vendor.vendorId': vendorInformation.vendorId }, { 'vendor.$': 1 })
    if (filter !== null) {
        return res.status(400).json({ message: 'Vendor sudah ada dalam list', data: filter })
    }


    // Save Data in booking Database
    await new bookingDb({
        eventName: bookingInformation.eventName,
        eventId: bookingInformation.eventId,
        location: bookingInformation.location,
        bookingDate: bookingInformation.bookingDate,
        eventDate: bookingInformation.eventDate,
        bookingStatus: bookingInformation.bookingStatus,
        paidStatus: bookingInformation.paidStatus,
        // Vendor
        vendorId: vendorInformation.vendorId,
        vendorName: vendorInformation.vendorName,
        vendorAddress: vendorInformation.vendorAddress,
        vendorPhone: vendorInformation.vendorPhone,
        vendorCategory: vendorInformation.vendorCategory,
        package: packageList,
        notes: vendorInformation.notes,
        // Information Client
        clientId: client.clientId,
        clientName: client.clientName,
        clientAddress: client.clientAddress,
        clientPhone: client.clientPhone
    }).save(async (err: string) => {
        if (err) {
            return res.json({ data: err, messaage: "Booking gagal" })
        } else {
            let msgAdd,msgSchedule,msgAddOrder:String =''

            // Callback ke Function tambah vendor
            await addVendor(bookingInformation, vendorInformation, client, res, msgAdd)

            // Callback ke Function tambah Schedule
            // let tambahSchedule = new Schedule(vendorInformation, client, bookingInformation)
            // await tambahSchedule.addSchedule()

            // Callback ke Function tambah Order Vendor
            // await addOrder(bookingInformation, vendorInformation, client, res)

            res.json({ message: `Booking succsess, ${msgAdd}` })
        }
    });



}