import { packagedb, PackageList } from "../../../Models/PackageModels";
import { Response } from 'express'

interface Request {
    vendor: {
        vendorId: string
    }
    body: PackageList
}


export const addPackage = async (req: Request, res: Response) => {
    const data = req.body
    const namePckg = new RegExp(data.packageName, 'ig')
    try {
        // Check Package name
        const checkPackage = await packagedb.findOne({ vendorId: req.vendor.vendorId, 'package.packageName': { $regex: namePckg } })
        if (checkPackage) {
            return res.json({ state: false, message: 'package already created' })
        }
        // Insert package
        let create = await packagedb.findOneAndUpdate({ vendorId: req.vendor.vendorId }, { $push: { package: data } })
        if (!create) {
            return res.json({ state: false, message: 'add package failed', logs: 'vendor not found' })
        }

        return res.json({ state: true, message: 'ok' })

    } catch (error: any) {
        return res.json({ state: false, message: error.toString() })
    }
}

