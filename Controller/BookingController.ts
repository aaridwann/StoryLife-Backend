const bookingDb = require('../Models/BookingModels')
const projectDb = require('../Models/ProjectModels')
const vendorDb = require('../Models/VendorsModels')
const userDb = require('../Models/UsersModels')
import { Response } from 'express'
const { addVendor } = require('../Controller/ProjectController')


const categoryVendor = ['photography', 'videography', 'makeup artist', 'gawn', 'decoration', 'invitation', 'venue', 'mc', 'entertainment', 'wedding service']



interface BookingInformation {
    eventName: String
    eventId: String
    location: String
    bookingDate: Date
    eventDate: Date
    bookingStatus: 'pending' | 'accepted' | 'rejected'
    paidStatus: Boolean
}
interface Vendor {
    idVendor: String
    vendorName: String
    vendorAddress: String
    vendorPhone: String[]
    vendorCategory: typeof categoryVendor
    notes: String
    package: Array<{}>
}
interface Client {
    idClient: String
    clientName: String
    clientAddress: String
    clientPhone: String
}

export const booking = async (req: any, res: Response) => {
    let { _id } = req.user
    const { notes, eventId, idVendor, nameVendor, packageList } = req.body

    // // Validator
    if (!eventId || !idVendor || !nameVendor) { return res.json({ message: 'Data tidak lengkap' }) }

    // Cek Client
    const checkClient = await userDb.findOne({ _id: _id })
    if (!checkClient) {
        return res.status(400).json({ data: checkClient, message: 'Client tidak ada' })
    }

    // cek event 
    const checkEvent = await projectDb.findOne({ _id: eventId, userId: _id })
    if (!checkEvent) {
        return res.status(400).json({ message: 'Event tidak ada harap membuat project terlebih dahulu' })
    }
    // cek vendor
    const checkVendor = await vendorDb.findOne({ _id: idVendor, nameVendor: nameVendor })
    if (!checkVendor) { return res.status(400).json({ message: 'Vendor tidak ada' }) }


    // Data !!!
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
        idVendor: checkVendor._id,
        vendorName: checkVendor.name,
        vendorAddress: checkVendor.address,
        vendorPhone: [checkVendor.phone1, checkVendor.phone1],
        vendorCategory: checkVendor.category,
        notes: notes,
        package: packageList
    }
    const client: Client = {
        idClient: checkClient._id,
        clientName: checkClient.name,
        clientAddress: checkClient.address,
        clientPhone: checkClient.phone
    }

    // Filter Vendor Sudah booking atau belum
    let filterName = 'vendor.' + vendorInformation.vendorCategory + '.vendorName'
    let filter = await projectDb.findOne({ _id: [bookingInformation.eventId], [filterName]: [vendorInformation.vendorName] })
    if (filter !== null) {
        return res.status(400).json({ message: 'Vendor sudah ada dalam list' })
    }



    // Save Data
    await new bookingDb({
        eventName: bookingInformation.eventName,
        eventId: bookingInformation.eventId,
        location: bookingInformation.location,
        bookingDate: bookingInformation.bookingDate,
        eventDate: bookingInformation.eventDate,
        bookingStatus: bookingInformation.bookingStatus,
        paidStatus: bookingInformation.paidStatus,
        // Vendor
        idVendor: vendorInformation.idVendor,
        vendorName: vendorInformation.vendorName,
        vendorAddress: vendorInformation.vendorAddress,
        vendorPhone: vendorInformation.vendorPhone,
        vendorCategory: vendorInformation.vendorCategory,
        package: packageList,
        notes: notes,
        // Information Client
        idClient: client.idClient,
        clientName: client.clientName,
        clientAddress: client.clientAddress,
        clientPhone: client.clientPhone
    }).save((err: string) => {
        if (err) {
            return res.json({ data: err, messaage: "gagal" })
        }
        addVendor(bookingInformation, vendorInformation, client, res)
    });



}