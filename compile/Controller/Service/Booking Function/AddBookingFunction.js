"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddBookingFunction = void 0;
const { bookingDb } = require('../../../Models/BookingModels');
const { userDb } = require('../../../Models/UsersModels');
const { vendor: vendorDb } = require('../../../Models/VendorsModels');
const { eventDb } = require('../../../Models/EventModels');
const PackageModels_1 = require("../../../Models/PackageModels");
const AddBookingFunction = async (req) => {
    let { client, vendor, booking, packages } = req.body;
    if (!client || !vendor || !booking || !packages) {
        return console.log('Check your Request Body');
    }
    // stage 1 Validation user
    let user = await CheckClient(client.clientId);
    // stage 2 validation vendor
    let vendors = await CheckVendor(vendor.vendorId);
    // stage 3 check event
    let event = await CheckEvent(user._id, booking.eventName, booking.eventId);
    // Stage 4 Check package vendor
    let item = await CheckPackageVendor(vendors.vendorId, packages._id);
    // Stage 5 Check EventBookingVendor
    let CheckVendorBooking = CheckEventBookingVendor(event.vendor, vendors.vendorId);
    // Create Booking on BookingDb
    let write = await BookingWrite(user, vendors, event, item);
    return console.log(write);
    // return console.log({ client: user, vendor: vendors, event: event, package: item, checkVendor: CheckVendorBooking })
};
exports.AddBookingFunction = AddBookingFunction;
async function CheckClient(id) {
    try {
        let res = await userDb.findOne({ _id: id });
        if (!res) {
            return false;
        }
        else {
            return res;
        }
    }
    catch (error) {
        return false;
    }
}
async function CheckVendor(id) {
    try {
        let res = await vendorDb.findOne({ vendorId: id }, { identity: 0, _id: 0, bankAccount: 0, status: 0, balance: 0 });
        return res;
    }
    catch (error) {
        return error;
    }
}
async function CheckEvent(userId, eventName, eventId) {
    if (!userId || !eventName || !eventId) {
        return 'params Check Event Function tidak lengkap';
    }
    try {
        let res = await eventDb.findOne({ userId: userId, 'eventList.eventName': eventName, 'eventList._id': eventId }, { 'eventList.$': 1 });
        return res.eventList[0];
    }
    catch (error) {
        return error;
    }
}
async function CheckPackageVendor(vendorId, packageId) {
    if (!vendorId || !packageId) {
        console.log('check params check package vendor function');
    }
    try {
        let res = await PackageModels_1.packagedb.findOne({ vendorId: vendorId, 'package._id': packageId }, { 'package.$': 1 });
        if (res === null) {
            return 'package not found';
        }
        return res.package[0];
    }
    catch (error) {
        return error;
    }
}
function CheckEventBookingVendor(event, vendorId) {
    if (!event || !vendorId) {
        return 'check your params';
    }
    let check = event.find((x) => x.vendorId === vendorId);
    if (check == null) {
        return { state: true, message: 'vendor belum ada' };
    }
    else {
        return { state: false, message: 'vendor sudah ada' };
    }
}
async function BookingWrite(client, vendor, booking, packages) {
    if (!client || !vendor || !booking || !packages) {
        return 'check your params BookingWriteFunction';
    }
    // return vendor.vendorCategory
    try {
        let res = await eventDb.findOne({ userId: client._id, 'eventList.vendor.vendorCategory': vendor.vendorCategory });
        let response = res.eventList.map((x) => x.vendor.find((x) => x.vendorCategory == vendor.vendorCategory))[0];
        // return response
        try {
            let query = await eventDb.updateOne({ 'eventList.vendor._id': response }, { $set: { 'eventList.vendor..vendorCategory': 'ngehekk' } });
            return query;
        }
        catch (error) {
            return error;
        }
    }
    catch (error) {
        return error;
    }
    // return { client, vendor, booking, packages }
}
