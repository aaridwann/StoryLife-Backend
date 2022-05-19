import { Response } from "express"
import { packagedb } from '../../Models/PackageModels'
interface Req {
    query: {
        id: string
    }
}

export const DetailPackage = async (req: Req, res: Response) => {
    // init id from query req
    let { id } = req.query

    // handler if id not found
    if (!id || id == undefined || id == null) {
        return res.status(400).json('id package not found')
    }

    // find id in db
    let response = await packagedb.findOne({ 'package._id': id }, { _id: 0, 'package.$': 1 })
    if (response === null) {
        return res.status(400).json('package not found')
    } else {
        return res.status(200).json(response)
    }
}