import { categoryEvent } from "../../../Models/EventModels"
import { vendorCategory } from "../../../Models/EventModels"
import { Response } from 'express'
const GetCategory = async (req: any, res: Response) => {
    return res.status(200).json({ state: true, data: { eventCategory: categoryEvent, vendorCategory: vendorCategory } })
}

export default GetCategory