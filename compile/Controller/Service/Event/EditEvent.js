"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditEvent = void 0;
const mongodb_1 = require("mongodb");
const { eventDb, categoryEvent } = require('../../../Models/EventModels');
const EditEvent = async (req, res) => {
    if (!req.params.id) {
        return res.status(400).json({ state: false, messaeg: 'request params not found' });
    }
    // Step 1
    // Validation data
    let data = await validationData(req.body);
    if (!data.state) {
        return res.status(400).json(data);
    }
    // Step 2
    // Validation Duplicate Event Function
    let validateDuplicateEvent = await ValidationDuplicateEvent(data.message.eventName, req.user._id);
    if (!validateDuplicateEvent.state) {
        return res.status(400).json(validateDuplicateEvent);
    }
    // 3. Insert into Db Events
    try {
        let insert = await eventDb.updateOne({ userId: req.user._id, 'event._id': new mongodb_1.ObjectId(req.params.id) }, { $set: { 'event.$': data.message } });
        if (!insert.matchedCount) {
            return res.status(400).json({ state: false, message: 'event not found' });
        }
        else if (!insert.modifiedCount) {
            return res.status(400).json({ state: false, message: 'something error' });
        }
        return res.status(201).json({ state: true, message: 'success edit event', data: insert });
    }
    catch (error) {
        return res.status(400).json({ state: false, message: error });
    }
};
exports.EditEvent = EditEvent;
// Child Function //
async function validationData(req) {
    let format = {
        eventName: 'your event name',
        eventDate: '28 August 2022',
        eventLocation: { street: 'Gatot Subroto', city: 'Jakarta', province: 'DKI', state: 'Indonesia' },
        eventCategory: 'wedding',
        vendor: ['photography', 'makeup artist', 'decoration'],
    };
    if (!req.eventName || !req.eventDate || !req.eventLocation || !req.eventCategory || !req.vendor) {
        return { state: false, message: { error: 'check your input', format: format } };
    }
    if (!categoryEvent.includes(req.eventCategory)) {
        return { state: false, message: 'category event not correct' };
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
    return { state: true, message: data };
}
async function ValidationDuplicateEvent(eventName, userId) {
    let res = await eventDb.findOne({ userId: userId, 'event.eventName': eventName });
    if (res) {
        return { state: false, message: 'you have already event' };
    }
    else {
        return { state: true };
    }
}
