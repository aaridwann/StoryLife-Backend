// const vendor = require('../../Models/VendorsModels')

interface Params {
    id: string
    name: string
    category: string
}
export const getVendorAggregate = async (x: Params, vendor: any) => {
    let res = await vendor.aggregate([
        {
            $lookup: {
                from: 'packagelists',
                localField: 'vendorId',
                foreignField: 'vendorId',
                as: 'Package'
            }
        },
        { $match: { $or: [{ vendorId: x.id }, { name: x.name }, { category: x.category }] } },
        {
            $project: {
                _id: '$vendorId',
                name: '$name',
                address: '$address',
                category: '$category',
                phone: ['$phone1', '$phone2'],
                package: '$Package.package',
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