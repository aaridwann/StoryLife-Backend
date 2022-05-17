import { scheduleDb, ScheduleVendor, ScheduleFormat } from "../Models/ScheduleVendorModels";
import { BookingInformation, Client, Vendor } from '../Controller/BookingController'

module.exports = class Schedule {
    vendor: Vendor
    client: Client;
    event: BookingInformation
    message: { message: String }
    constructor(vendor: Vendor, client: Client, event: BookingInformation) {
        this.client = client,
            this.vendor = vendor,
            this.event = event,
            this.message = { message: 'Add Schedule is Failed' }
    }

    async addSchedule() {
        let data: ScheduleFormat = {
            eventId: this.event.eventId,
            eventName: this.event.eventName,
            eventDate: this.event.eventDate
        }
        try {
            await scheduleDb.updateOne<ScheduleVendor>({ vendorId: this.vendor.vendorId, vendorName: this.vendor.vendorName },
            { $push: { scheduleList: data } })
            this.message = { message: 'Add Schedule Is Success' }
        } catch (error) {
            this.message = { message: 'Add Schedule Is Fail => ' + error }
        }

    }

}