import { Response } from 'express'
import { ObjectId } from 'mongodb'
import { packagedb } from '../../../Models/PackageModels'

interface Request {
    vendor: {
        vendorId: string
    }
    params: {
        id: string
    }
}

export const deletePackage = async (req: Request, res: Response) => {
    if (!req.params.id) {
        return res.status(400).json({ state: false, message: 'params id not found' })
    }

    try {
        const destroy = await packagedb.updateOne({ vendorId: req.vendor.vendorId, 'package._id': new ObjectId(req.params.id) }, { $pull: { package: { _id: new ObjectId(req.params.id) } } })
        if (!destroy.modifiedCount) {
            return res.status(400).json('package not found')
        }
        return res.status(201).json('package success delete')
    } catch (error: any) {
        return res.status(500).json(error.toString())
    }



}