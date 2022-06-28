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
        
        // Lookup packageList
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

        // Projectsi
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
        return console.log(res[0])
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
    let params = { id: '625acf909f5986c218a0260a', name: '', category: 'decoration' }
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
    // let res = 'tidak ada'
    // expect(await get(params)).toEqual(params.name)
    // expect(await get(titid)).toBe(res)
})

