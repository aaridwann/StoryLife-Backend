import { ObjectId } from 'mongodb'
import { userDb } from '../Models/UsersModels'
import { vendor } from '../Models/VendorsModels'

export const verifyVendor = async (req: any, res: any, next: any) => {
    try {
        // Check user vendor atau bukan
        const user = await userDb.findOne({ _id: new ObjectId(req.user._id), vendor: true })
        if (!user) {
            return res.json({ data: user, message: 'Anda bukan Vendor' })
        }
        // Chek user sudah punya vendor atau belum
        const vndr = await vendor.findOne({ vendorId: user._id })
        if (!vndr) {
            return res.json({ data: vndr, message: 'Vendor kamu belum ada' })
        }
        req.vendor = vndr
        
        next()

    } catch (error) {
        res.json(error)
    }
}