"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbortEvent = void 0;
const mongodb_1 = require("mongodb");
const EventModels_1 = require("../../../../Models/EventModels");
const AbortEvent = async (eventId, categoryVendor, pckg) => {
    console.log(pckg);
    try {
        const abort = await EventModels_1.eventDb.findOneAndUpdate(
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
                'event.$[inner].vendor.$[outer].vendorName': '',
                'event.$[inner].vendor.$[outer].vendorId': '',
                'event.$[inner].vendor.$[outer].vendorPhone': '',
            },
            $pull: {
                'event.$[inner].vendor.$[outer].package': { packageName: pckg.packageName },
            },
            $inc: {
                'event.$[inner].totalCost': -pckg.price
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
        });
        if (!abort)
            return { state: false, message: 'abort event failed' };
        return { state: true, message: 'abort event success' };
    }
    catch (error) {
        return { state: false, message: error.toString() };
    }
};
exports.AbortEvent = AbortEvent;
