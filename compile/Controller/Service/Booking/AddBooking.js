"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pushDataBooking = exports.proccessingData = exports.getEvent = exports.getVendor = exports.getPackage = exports.getUser = exports.addBooking = void 0;
const mongodb_1 = require("mongodb");
const EventModels_1 = require("../../../Models/EventModels");
const PackageModels_1 = require("../../../Models/PackageModels");
const UsersModels_1 = require("../../../Models/UsersModels");
const VendorsModels_1 = require("../../../Models/VendorsModels");
const BookingModels_1 = require("../../../Models/BookingModels");
const AddOrder_1 = require("./Add Additional/AddOrder");
const AddSchedule_1 = require("./Add Additional/AddSchedule");
const Abort_Sales_Package_1 = require("./Abort Booking/Abort Sales Package");
const AbortEvent_1 = require("./Abort Booking/AbortEvent");
const AbortBooking_1 = require("./Abort Booking/AbortBooking");
const Middleware_1 = require("./Middleware/Middleware");
// OKE ! 1. get data user <findOne>
// OKE ! 2. get data package and update Sales < findOneAndUpdate >
//          2.4 update Sales +1 
// OKE ! 3. get data vendor dari package < findOne >
// OKE ! 4. get data event dan langsung edit 
// OKE !    4.1. vendor list dengan vendor dan package < findOneAndUpdate >
// OKE !    4.2. total cost
// OKE ! 5. olah data user,event,package,vendor 
// OKE ! 6. create data BOOKING (PUSH) < updateOne >
// OKE ! 7. create additional order & schedule <updateOne>
// OKE ! 8. jika 4 | 6 | 7 gagal abort 2, 4, 6, 7
// OKE ! 9. Create Middleware Booking vendor name in first line
// OKE ! PR ADDING TOTAL & NOTES in data proccessing in package
// Abort Function
// OKE ! 1. Abort Sales
// OKE ! 2. Abort Event 
// - hapus vendor berdasarkan vendor category
// - Reset cost => cont - package price
// OKE ! 3. Abort Booking
const addBooking = async (req, res) => {
    if (!req.query.eventId || !req.query.packageId) {
        return res.status(400).json('query params url not found:: example= http://localhost:8000/booking/?packageId=<YOUR PACKAGE ID>&eventId=<YOUR EVENT ID>');
    }
    // Middleware
    const checkBooked = await (0, Middleware_1.middlewareAlreadyBooking)(req.query.eventId, req.query.packageId);
    if (!checkBooked.state) {
        return res.json(checkBooked);
    }
    // 1. get user
    const user = await (0, exports.getUser)(req.user._id);
    if (!user.state)
        return res.status(400).json(user);
    // 2. get package
    // Return Array
    const pckg = await (0, exports.getPackage)(req.query.packageId, req.body.quantity, req.body.notes);
    if (!pckg.state)
        return res.status(400).json(pckg);
    // 3. get vendor
    const vendors = await (0, exports.getVendor)(pckg.message.vendorId);
    if (!vendors.state)
        return res.status(400).json(vendors);
    // 4. Get and modify event Db 
    const event = await (0, exports.getEvent)(req.query.eventId, vendors.message.vendorCategory, vendors.message, pckg.message.package[0]);
    if (!event.state) {
        const abortPckg = await (0, Abort_Sales_Package_1.AbortSales)(pckg.message.package[0]._id, req.body.quantity);
        return res.status(400).json({ message: event, log: [abortPckg.message] });
    }
    // 5. Proccessing Data
    const data = (0, exports.proccessingData)(user.message, pckg.message.package[0], vendors.message, event.message);
    if (!data)
        return res.status(400).json(data);
    // 6. Push data booking
    const pushData = await (0, exports.pushDataBooking)(data.message);
    if (!pushData.state) {
        const abortPckg = await (0, Abort_Sales_Package_1.AbortSales)(pckg.message.package[0]._id, req.body.quantity);
        const abortEvnt = await (0, AbortEvent_1.AbortEvent)(data.message.bookingInformation.eventId, vendors.message.vendorCategory, pckg.message.package[0]);
        return res.status(400).json({ message: pushData, log: [abortPckg.message, abortEvnt.message] });
    }
    // 7. Add To Order
    const order = await (0, AddOrder_1.addOrder)(data.message, pushData.message._id);
    if (!order.state) {
        const abortPckg = await (0, Abort_Sales_Package_1.AbortSales)(pckg.message.package[0]._id, req.body.quantity);
        const abortEvnt = await (0, AbortEvent_1.AbortEvent)(data.message.bookingInformation.eventId, vendors.message.vendorCategory, pckg.message.package[0]);
        const abortBooking = await (0, AbortBooking_1.AbortBooking)(data.message.clientInformation.clientId, data.message.bookingInformation.eventId);
        return res.status(400).json({ message: order, log: [abortPckg.message, abortEvnt.message, abortBooking.message] });
    }
    // 8. Add Schedule
    const schedule = await (0, AddSchedule_1.addSchedule)(vendors.message.vendorId, event.message._id, event.message.eventName, event.message.eventDate);
    if (!schedule.state) {
        const abortPckg = await (0, Abort_Sales_Package_1.AbortSales)(pckg.message.package[0]._id, req.body.quantity);
        const abortEvnt = await (0, AbortEvent_1.AbortEvent)(data.message.bookingInformation.eventId, vendors.message.vendorCategory, pckg.message.package[0]);
        const abortBooking = await (0, AbortBooking_1.AbortBooking)(data.message.clientInformation.clientId, data.message.bookingInformation.eventId);
        const abortOrdr = await (0, AddOrder_1.abortOrder)(data.message.vendorInformation.vendorId, data.message.bookingInformation.eventId);
        return res.status(400).json({ message: schedule, log: [abortPckg.message, abortEvnt.message, abortBooking.message, abortOrdr.message] });
    }
    return res.json({ message: 'success', booking: pushData.message, order: order.message, shcedule: schedule.message });
};
exports.addBooking = addBooking;
const getUser = async (userId) => {
    try {
        let get = await UsersModels_1.userDb.findOne({ _id: new mongodb_1.ObjectId(userId) }, { name: 1, phone: 1, address: 1, email: 1 });
        if (!get)
            return { state: false, message: 'user not found' };
        return { state: true, message: get };
    }
    catch (error) {
        return { state: false, message: error.toString() };
    }
};
exports.getUser = getUser;
const getPackage = async (packageId, quantity, notes) => {
    try {
        const get = await PackageModels_1.packagedb.findOneAndUpdate({ package: { $elemMatch: { _id: new mongodb_1.ObjectId(packageId) } } }, { $inc: { 'package.$.sales': quantity } }, { new: true }).lean();
        if (!get)
            return { state: false, message: 'package not found' };
        const data = JSON.parse(JSON.stringify(get));
        data.package[0].total = (quantity * data.package[0].price) - data.package[0].discount;
        data.package[0].notes = notes;
        data.package[0].quantity = quantity;
        delete data.package[0].sales;
        delete data.package[0].image;
        return { state: true, message: data };
    }
    catch (error) {
        return { state: false, message: error.toString() };
    }
};
exports.getPackage = getPackage;
const getVendor = async (vendorId) => {
    try {
        const get = await VendorsModels_1.vendor.findOne({ vendorId: vendorId }, { identity: 0, bankAccount: 0, image: 0, state: 0, balance: 0, _id: 0, __v: 0 });
        if (!get)
            return { state: false, message: 'vendor not found' };
        return { state: true, message: get };
    }
    catch (error) {
        return { state: false, message: error.toString() };
    }
};
exports.getVendor = getVendor;
const getEvent = async (eventId, categoryVendor, dataVendor, pckg) => {
    try {
        const get = await EventModels_1.eventDb.findOneAndUpdate(
        // Filter
        {
            'event': {
                $elemMatch: {
                    _id: new mongodb_1.ObjectId(eventId),
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
                { 'inner._id': new mongodb_1.ObjectId(eventId) },
                { 'outer.vendorCategory': categoryVendor }
            ],
        }).lean();
        if (!get)
            return { state: false, message: 'vendor category not found please add category in event before' };
        return { state: true, message: get.event[0] };
    }
    catch (error) {
        return { state: false, message: error.toString() };
    }
};
exports.getEvent = getEvent;
const proccessingData = (user, pckg, vendor, event) => {
    // 1. init data Booking Information
    const bookingInformation = {
        eventName: event.eventName,
        eventId: event._id.toString(),
        eventLocation: event.eventLocation,
        eventCategory: event.eventCategory,
        eventDate: event.eventDate,
        bookingDate: Date.now(),
        bookingStatus: false,
        paidStatus: false,
    };
    // 2. init data Vendor Information
    const vendorInformation = {
        vendorId: vendor.vendorId,
        vendorName: vendor.vendorName,
        vendorAddress: vendor.address,
        vendorPhone: vendor.contact,
        vendorCategory: vendor.vendorCategory,
        package: [pckg]
    };
    // 3. init Client information
    const clientInformation = {
        clientId: user._id.toString(),
        clientName: user.name,
        clientAddress: user.address,
        clientPhone: user.phone,
    };
    return { state: true, message: { bookingInformation, vendorInformation, clientInformation } };
};
exports.proccessingData = proccessingData;
const pushDataBooking = async (data) => {
    if (!data)
        return { state: false, message: 'something error', log: data };
    try {
        const push = await BookingModels_1.bookingDb.findOneAndUpdate({ userId: data.clientInformation.clientId }, { $push: { bookingList: data } }, { new: true });
        if (!push)
            return { state: false, message: 'something error' };
        return { state: true, message: push };
    }
    catch (error) {
        return { state: false, message: error.toString() };
    }
};
exports.pushDataBooking = pushDataBooking;
