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

    try {
        const destroy = await packagedb.updateOne({ vendorId: req.vendor.vendorId }, { $pull: { package: { _id: new ObjectId(req.params.id) } } })
        if (!destroy) {
            return res.status(500).json('not found')
        }
        return res.status(201).json('delete succsses')
    } catch (error: any) {
        return res.json(error.toString())
    }



}