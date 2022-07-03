"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVendorSchedule = exports.getVendor = exports.addVendor = void 0;
const createSchedule_1 = require("../CreateDb/createSchedule");
const OrderModels_1 = require("../Models/OrderModels");
const VendorFunction_1 = require(".././Controller/Vendor Function/VendorFunction");
const vendorDb = require('../Models/VendorsModels');
const userDb = require('../Models/UsersModels');
const categoryList = ['photography', 'videography', 'makeup artist', 'gawn', 'decoration', 'invitation', 'venue', 'mc', 'entertainment', 'wedding service'];
// Sign up as Vendors
const addVendor = async (req, res) => {
    const userId = req.user._id;
    const { name, identity: { typeIdentity, numberIdentity }, categoryVendor, address: { street, city, province, state }, phone1, phone2, bankAccount: { bankName, accountNumber } } = req.body;
    if (!typeIdentity || !numberIdentity || !categoryVendor || !street || !city || !state || !province || !phone1 || !phone2 || !bankName || !accountNumber) {
        return res.status(400).json({ message: 'data tidak lengkap' });
    }
    if (!categoryList.includes(categoryVendor)) {
        return res.status(404).json({ message: 'Category tidak tersedia' });
    }
    // Cek name Vendor
    let check = await vendorDb.findOne({ name: name }, { name: 1, categoryVendor: 1, address: 1 });
    if (check) {
        return res.json({ data: check, message: 'vendor sudah terdaftar' });
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
        }).save(async (err) => {
            if (err) {
                return res.status(400).json({ data: err, message: 'Akun sudah terdaftar' });
            }
            // Edit user to Cheklist Vendor
            let response = await userDb.updateOne({ _id: userId }, { $set: { vendor: true } });
            await (0, createSchedule_1.createVendorSchedule)(req.user, name, res);
            return res.status(201).json({ message: 'Success', dataUser: response });
        });
    }
    catch (error) {
        res.json(error);
    }
};
exports.addVendor = addVendor;
// get Vendor by Query
const getVendor = async (req, res) => {
    // let tgl = (req.query.date as string).split(' ').map((x) => Number(x)).reverse()
    let params = {
        name: req.query.name,
        category: req.query.category,
        id: req.query.id,
    };
    // name = name.trim()
    // let tanggal = new Date(tgl[0], tgl[1] - 1, tgl[2] + 1).toISOString()
    // let nameReg = new RegExp(`${params.name}`, 'i')
    // let categoryReg = new RegExp(`${params.category}`)
    // let response = await vendorDb.aggregate([
    //     {
    //         $lookup: {
    //             from: 'schedules',
    //             localField: 'vendorId',
    //             foreignField: 'vendorId',
    //             as: 'schedules'
    //         }
    //     },
    //     { $match: { vendorId: id, name: { $regex: nameReg }, category: { $regex: categoryReg } } },
    //     { $project: { name: 1, 'schedules': '$schedules.scheduleList.eventDate' } }
    // ])
    let response = await (0, VendorFunction_1.getVendorAggregate)(params, vendorDb);
    res.json(response);
};
exports.getVendor = getVendor;
// Get Vendor Schedule
const getVendorSchedule = async (req, res) => {
    let { name, date } = req.query;
    let nameReg = new RegExp(`${name}`, 'i');
    let tanggal = date.toString().split(" ").reverse();
    let dateSchedule = new Date(parseInt(tanggal[0]), parseInt(tanggal[1]) - 1, parseInt(tanggal[2]) + 1);
    let response = await OrderModels_1.orderDb.find({ vendorName: { $regex: nameReg }, 'orderList.orderDetail.eventDate': dateSchedule }, { 'orderList.orderDetail.eventDate': 1, vendorName: 1, 'orderList.eventName': 1 });
    res.json(response);
};
exports.getVendorSchedule = getVendorSchedule;
// Get Follow by id
// ServicePackage()
