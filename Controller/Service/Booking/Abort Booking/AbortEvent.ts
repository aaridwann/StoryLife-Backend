

import { ObjectId } from "mongodb";
import { eventDb } from "../../../../Models/EventModels";

export const AbortEvent = async (eventId: string, categoryVendor: string, pckg: any): Promise<{ state: boolean, message: any }> => {
    console.log(pckg)
    try {
        const abort = await eventDb.findOneAndUpdate(
            // Filter
            {
                'event': {
                    $elemMatch: {
                        _id: new ObjectId(eventId),
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
                    'event.$[inner].totalCost': - pckg.price
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
                    { 'inner._id': new ObjectId(eventId) },
                    { 'outer.vendorCategory': categoryVendor }
                ],
            })
        if (!abort) return { state: false, message: 'abort event failed' }
        return { state: true, message: 'abort event success' }
    } catch (error: any) {
        return { state: false, message: error.toString() }
    }



}