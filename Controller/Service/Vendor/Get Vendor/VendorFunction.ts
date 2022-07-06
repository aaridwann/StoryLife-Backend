import { vendor } from '../../../../Models/VendorsModels'
interface Params {
    id: string
    name: string
    category: string
}
export const GetVendors = async (x: Params, vendor: any) => {
    let res = await vendor.aggregate([
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

    if (res[0] === undefined) {
        return null
    } else {
        // return console.log(res)
        return res
    }
}