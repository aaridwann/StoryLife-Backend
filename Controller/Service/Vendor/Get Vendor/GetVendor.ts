import { vendor } from '../../../../Models/VendorsModels'
import { Response } from 'express'
interface Params {
    id: string
    name: string
    category: string
}
export const GetVendors = async (x: Params, res: Response) => {

    try {
        let response = await vendor.aggregate([
            // Lookup Package
            {
                $lookup: {
                    from: 'packagelists',
                    localField: 'vendorId',
                    foreignField: 'vendorId',
                    as: 'Package'
                }
            },

            // addField UserId
            { $addFields: { userId: '$vendorId' } },

            // lookup follow
            {
                $lookup: {
                    from: 'follows',
                    localField: 'userId',
                    foreignField: 'userId',
                    as: 'Follow'
                }
            },

            // Match
            { $match: { $or: [{ vendorId: x.id }, { name: x.name }, { category: x.category }] } },

            // unwind
            { $unwind: { path: '$Follow', preserveNullAndEmptyArrays: true } },

            // Proyeksi
            {
                $project: {
                    _id: '$vendorId',
                    name: '$name',
                    address: '$address',
                    category: '$category',
                    phone: ['$phone1', '$phone2'],
                    package: '$Package.package',
                    follow: { following: '$Follow.following', follower: '$Follow.follower' }
                }
            }
        ])

        if (!response[0]) return res.status(400).json({ state: false, message: 'not found' })
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json(error)
    }
}