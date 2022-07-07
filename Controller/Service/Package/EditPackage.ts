import { Response } from 'express'
import { ObjectId } from 'mongodb';
import { packagedb, CategoryPackage } from "../../../Models/PackageModels";

interface Request {
    vendor: {
        vendorId: string
    },
    params: {
        id: string
    },
    body: any
}

export const editPackage = async (req: Request, res: Response) => {
    // 1. Validation Body
    const valid = await Validation(req.body)
    if (!valid.state) {
        return res.status(400).json(valid)
    }

    try {
        const edit = await packagedb.findOneAndUpdate({ vendorId: req.vendor.vendorId, 'package._id': new ObjectId(req.params.id) }
            , { $set: { 'package.$': valid.message } }, { package: 1, new: true })
        if (!edit) {
            return res.status(400).json({ state: false, message: 'not found' })
        }
        return res.status(201).json({ state: true, message: 'success update', data: edit })

    } catch (error: any) {
        return res.status(500).json({ state: false, message: error.toString() })
    }
}

async function Validation(data: any) {
    const message = (m: string) => {
        return { state: false, message: m }
    };


    if (!data.packageName) {
        return message('package name not found')
    } else if (!data.category) {
        return message('pacakge category not found')
    } else if (!data.price) {
        return message('package price not found')
    } else if (!data.details) {
        return message('package details not found')
    } else if (!data.image || !data.date) {
        data.image = ''
        data.date = Date.now()
    }
    if (!CategoryPackage.includes(data.category)) {
        return message('category not correct')
    }

    return { state: true, message: data }
}