let mongoose = require('mongoose')
let db = 'mongodb://127.0.0.1/StoryLife'
const vendor = require('../Models/VendorsModels')

afterAll(async () => {
    await mongoose.connection.close()
})
beforeAll(async () => {
    await mongoose.connect(db)
})

async function getVendor(x) {
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


async function get(x) {
    try {
        let res = await vendor.findOne({ name: x.name })
        if (res == null) {
            return 'tidak ada'
        }
        return res.name
    } catch (error) {
        return console.log(error)
    }
}


test('aggregate', async () => {
    let params = { id: '625edb85f8412027c58de6db', name: 'concept photography', category: 'decoration' }
    let undefinedParams = { id: '', name: '', category: '' }

    // expect(await getVendor(params)).toBeDefined()
    // expect(await getVendor(undefinedParams)).toBeNull()
    // await aggregate(undefinedParams)
    await getVendor(params)
})


test('get by name', async () => {
    let params = {
        name: 'Twin photography'
    }
    let titid = {
        name: 'hahah'
    }
    let res = 'tidak ada'
    expect(await get(params)).toEqual(params.name)
    expect(await get(titid)).toBe(res)
})

