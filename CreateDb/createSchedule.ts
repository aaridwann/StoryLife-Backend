import { scheduleDb, ScheduleVendor, ScheduleFormat } from "../Models/ScheduleVendorModels";
import { User } from "../Controller/ProjectController";
import { Response } from 'express'

export const createVendorSchedule = async (user: User, vendor: String, res: Response) => {
    new scheduleDb<ScheduleVendor>({
        vendorId: user._id,
        vendorName: user.name,
        scheduleList: []
    })
        .save((err) => {
            if (err) {
                return res.json(err)
            }
            console.log("Schedule Created")
        })
}

