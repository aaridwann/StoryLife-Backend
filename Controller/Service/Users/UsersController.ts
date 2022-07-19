import { Response } from "express"
import { ObjectId } from "mongodb"
import { userDb } from '../../../Models/UsersModels'

interface Request {
    query: {
        id: string,
        name: string,
        vendor: any
    }
}

export const getUser = async (req: Request, res: Response) => {

    if (!req.query.vendor || req.query.vendor == 'false') {
        req.query.vendor = false
    } else {
        req.query.vendor = true
    }


    try {
        const get = await userDb.aggregate([
            {
                $addFields: {
                    'userId': { $toString: '$_id' }
                }
            },
            {
                $lookup: {
                    from: 'follows',
                    localField: 'userId',
                    foreignField: 'userId',
                    as: 'follow'
                }
            },
            {
                $lookup: {
                    from: 'events',
                    localField: 'userId',
                    foreignField: 'userId',
                    as: 'event'
                }
            },
            {
                $match: {
                    $or: [
                        { _id: new ObjectId(req.query.id) }, { name: req.query.name }, { vendor: req.query.vendor }
                    ]
                }
            },
            {
                $project: {
                    _id: '$_id',
                    name: '$name',
                    address: '$address',
                    vendor: '$vendor',
                    follow: { following: '$follow.following', follower: '$follow.follower' },
                    event: '$event.event'
                }
            },
            { $unwind: { path: '$follow', preserveNullAndEmptyArrays: true } },
            { $unwind: { path: '$event', preserveNullAndEmptyArrays: true } },
        ])
        return !get ? res.status(400).json('user not found') : res.status(200).json(get)
    } catch (error: any) {
        return res.status(500).json(error)
    }
}