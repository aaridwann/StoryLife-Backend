"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEvent = void 0;
const mongodb_1 = require("mongodb");
const { eventDb, categoryEvent } = require('../../../Models/EventModels');
const deleteEvent = async (req, res) => {
    if (!req.params.id) {
        return res.status(400).json({ state: false, message: 'request params id not found' });
    }
    try {
        const destroy = await eventDb.updateOne({ userId: req.user._id, 'event._id': new mongodb_1.ObjectId(req.params.id) }, { $pull: { event: { _id: new mongodb_1.ObjectId(req.params.id) } } });
        if (!destroy.modifiedCount) {
            return res.status(400).json({ state: false, message: 'event not found' });
        }
        return res.status(201).json({ state: true, message: 'event success delete' });
    }
    catch (error) {
        return res.status(500).json({ state: false, message: 'event not found' });
    }
};
exports.deleteEvent = deleteEvent;
