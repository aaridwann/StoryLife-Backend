"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddEventFunction = void 0;
const { eventDb } = require('../../../Models/EventModels');
const UsersModels_1 = require("../../../Models/UsersModels");
const AddEventFunction = async (req, res) => {
    // Step 1
    // Validation data
    let data = await validationData(req.body);
    if (data?.state == false) {
        return res.status(400).json({ state: false, message: data.message });
    }
    // Step 2
    // Validation Duplicate Event Function
    let validateDuplicateEvent = await ValidationDuplicateEvent(data?.eventName, req.user._id);
    if (validateDuplicateEvent.state === false) {
        return res.status(400).json({ state: false, message: validateDuplicateEvent.message });
    }
    // Step 3
    // Validation user is vendor or not and found
    let validatorUser = await validationUser(req.user._id);
    if (validatorUser.state == false) {
        return res.status(400).json({ stat: false, message: validatorUser.message });
    }
    // Step 4
    // Insert into Db Events
    try {
        let insert = new eventDb({ userId: req.user, event: data });
        await insert.save();
        return res.status(201).json({ state: true, message: 'success create event' });
    }
    catch (error) {
        return res.status(400).json({ state: false, message: error });
    }
};
exports.AddEventFunction = AddEventFunction;
// Child Function
async function validationData(req) {
    let format = {
        eventName: 'string',
        eventDate: 'number',
        eventLocation: { street: 'string', city: 'string', province: 'string', state: 'string' },
        eventCategory: 'string',
        vendor: ['vencorCategory', 'vencorCategory', 'vencorCategory'],
    };
    if (!req.eventName || !req.eventDate || !req.eventLocation || !req.eventCategory || !req.vendor) {
        return { state: false, message: { error: 'check your input', format: format } };
    }
    // Init category vendor
    let category = req.vendor.map((x) => {
        return { vendorCategory: x };
    });
    // Formater date
    let date = (date) => {
        let ml = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
        let month = ml.indexOf(date.split(' ')[1]);
        if (month == -1) {
            return 0;
        }
        let data = new Date(parseInt(date.split(' ')[2]), month, parseInt(date.split(' ')[0])).getTime();
        return data;
    };
    if (date(req.eventDate) == 0) {
        return { state: false, message: 'check date month or year format' };
    }
    // Init data from body
    let data = {
        eventName: req.eventName,
        eventDate: date(req.eventDate),
        eventLocation: req.eventLocation,
        eventCategory: req.eventCategory,
        vendor: category
    };
    return data;
}
async function ValidationDuplicateEvent(eventName, userId) {
    let res = await eventDb.findOne({ userId: userId, 'event.eventName': eventName });
    if (res) {
        return { state: false, message: 'name event duplicate' };
    }
    else {
        return { state: true };
    }
}
async function validationUser(idUser) {
    try {
        let response = await UsersModels_1.userDb.findOne({ _id: `${idUser}` }, { vendor: 1 });
        if (response === null) {
            return { state: false, message: 'user not found' };
        }
        else if (response.vendor === true) {
            return { state: false, message: 'vendor cannot create event' };
        }
        else {
            return { state: true };
        }
    }
    catch (error) {
        return { state: false, message: error.toString() };
    }
}
