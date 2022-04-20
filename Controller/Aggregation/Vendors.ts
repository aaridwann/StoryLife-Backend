import { getVendor } from "../VendorController"
import { Query } from "../VendorController"
import { Response } from "express"
interface Vendor {
    name: String
    category: String
    hasBooked: Date
}
type Data = Array<Vendor>

export const vendors = async (req: { query: Query }, res: Response) => {
    let getVendors = await getVendor(req, res)
    // let date = getVendors.map((x:any) => x.name)
// 
    // return res.json(date)
}