import { createVendorSchedule } from "../CreateDb/createSchedule"
import { Response } from 'express'
import { scheduleDb } from "../Models/ScheduleVendorModels"
import { orderDb } from "../Models/OrderModels"
const vendorDb = require('../Models/VendorsModels')
const userDb = require('../Models/UsersModels')
const categoryList = ['photography', 'videography', 'makeup artist', 'gawn', 'decoration', 'invitation', 'venue', 'mc', 'entertainment', 'wedding service']
export interface Query {
    name: String
    category: String,
    date: string
}
interface VendorData {
    vendorId: String,
    vendorName: String,
    vendorCategory: String,
    hasBooked?: any
}

// Sign up as Vendors
export const addVendor = async (req: any, res: any) => {
    const userId = req.user._id
    const { name, identity: { typeIdentity, numberIdentity }, categoryVendor, address: { street, city, province, state }, phone1, phone2, bankAccount: { bankName, accountNumber } } = req.body

    if (!typeIdentity || !numberIdentity || !categoryVendor || !street || !city || !state || !province || !phone1 || !phone2 || !bankName || !accountNumber) { return res.status(400).json({ message: 'data tidak lengkap' }) }
    if (!categoryList.includes(categoryVendor)) {
        return res.status(404).json({ message: 'Category tidak tersedia' })
    }

    // Cek name Vendor
    let check = await vendorDb.findOne({ name: name }, { name: 1, categoryVendor: 1, address: 1 })
    if (check) {
        return res.json({ data: check, message: 'vendor sudah terdaftar' })
    }
    try {
        // Add Vendor
        await new vendorDb({
            vendorId: userId,
            name: name,
            identity: { typeIdentity: typeIdentity, numberIdentity: numberIdentity },
            category: categoryVendor,
            address: { street: street, city: city, province: province, state: state },
            phone1: phone1,
            phone2: phone2,
            bankAccount: { bankName: bankName, accountNumber: accountNumber },
            status: false,
            balance: 0
        }).save(async (err: string) => {
            if (err) {
                return res.status(400).json({ data: err, message: 'Akun sudah terdaftar' })
            }
            // Edit user to Cheklist Vendor
            let response = await userDb.updateOne({ _id: userId }, { $set: { vendor: true } })
            await createVendorSchedule(req.user, name, res)
            return res.status(201).json({ message: 'Success', dataUser: response })
        })

    } catch (error) {
        res.json(error)
    }


}
// get Vendor by Query
export const getVendor = async (req: { query: Query }, res: Response) => {
    let tgl = (req.query.date as string).split(' ').map((x) => Number(x)).reverse()
    let { name, category, date } = req.query
    name = name.trim()
    let tanggal = new Date(tgl[0], tgl[1] - 1, tgl[2] + 1).toISOString()


    let nameReg = new RegExp(`${name}`, 'i')
    let categoryReg = new RegExp(`${category}`)


    let response = await vendorDb.aggregate([
        {
            $lookup: {
                from: 'schedules',
                localField: 'vendorId',
                foreignField: 'vendorId',
                as: 'schedules'
            }
        },
        { $match: { name: { $regex: nameReg }, category: { $regex: categoryReg } } },
        { $project: { name: 1, 'schedules': '$schedules.scheduleList.eventDate' } }
    ])

    res.json(response)

}
// Get Vendor Schedule
export const getVendorSchedule = async (req: { query: Query }, res: Response) => {
    let { name, date } = req.query
    let nameReg = new RegExp(`${name}`, 'i')
    let tanggal = date.toString().split(" ").reverse()
    let dateSchedule = new Date(parseInt(tanggal[0]), parseInt(tanggal[1]) - 1, parseInt(tanggal[2]) + 1)
    let response = await orderDb.find({ vendorName: { $regex: nameReg }, 'orderList.orderDetail.eventDate': dateSchedule }, { 'orderList.orderDetail.eventDate': 1, vendorName: 1, 'orderList.eventName': 1 })
    res.json(response)
}