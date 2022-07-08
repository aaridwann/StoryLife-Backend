// REGEX QUERY

const { deepStrictEqual, match } = require("assert")
const { ObjectId } = require("bson")

db.vendors.find({ name: { $regex: /rudi/i }, category: { $regex: /makeup/i } })

// Joint
db.vendors.aggregate([
    {
        $lookup: {
            from: 'schedules',
            localField: 'vendorId',
            foreignField: 'vendorId',
            as: 'schedules'
        }
    },
    { $match: { name: { $regex: / /i } } },
    { $project: { name: 1, 'schedules': '$schedules.scheduleList.eventDate' } },
]).pretty()
// Joint 2
db.vendors.aggregate([
    { $match: { name: {} } },
    { $group: { _id: '$name' } }
])
// distinct
db.vendors.distinct('category')
// count
db.orders.count({ vendorName: 'rudi makeup', orderList })

db.users.aggregate([
    { '$addFields': { 'userId': { '$toString': '$_id' } } },
    {
        $lookup: {
            from: 'projects',
            localField: 'userId',
            foreignField: 'userId',
            as: 'Project'
        }
    },
    { '$match': { userId: '625ae35a7748d3f48ab04b5e' } },
    { '$project': { password: 0, refreshToken: 0, createdAt: 0, updatedAt: 0, _id: 0, __v: 0 } }
]).pretty()

db.projects.findOne({ _id: ObjectId('6277fc40fee6ca664f85e4bb') })

let update = {
    price: 14000000
}

// Tambah Vendor dalam Event


db.projects.updateOne({ _id: ObjectId('62781b4112f1c41858a9a4d5'), 'vendor.category': 'makeup artist' },
    { $set: { 'vendor.$.price': 6000, 'vendor.$.name': 'Jian Qaumi Makeup Artist', 'vendor.$.package': ['wedding', 'engagement'] } })


db.users.aggregate([
    { $addFields: { 'userId': { $toString: '$_id' } } },
    {
        $lookup: {
            from: 'projects',
            localField: 'userId',
            foreignField: 'userId',
            as: 'Project'
        }
    },
    { $unwind: '$Project' },
    {
        $project: {
            name: '$name',
            project: { name: '$Project.name', date: '$Project.date' }
        }
    }
])
videography
let id = '625acf909f5986c218a0260a'

db.events.updateOne({ userId: '625acf909f5986c218a0260a', 'eventList.vendor.vendorCategory': 'videography' },
    { $set: { 'eventList.vendor.vendorName': 'taikl' } })

db.events.aggregate([
    {
        $project: {
            event: {
                $map: {
                    input: '$eventList',
                    as: 'v',
                    in: { '$$v.vendor.vendorCategory'}
                }
            }, userId: '$userId'
        }
    },
    { $match: { userId: '625acf909f5986c218a0260a' } },

]).pretty()

db.events.updateOne({ userId: '625acf909f5986c218a0260a', 'eventList.vendor.vendorCategory': 'videography' },
    { $replace: { 'eventList.vendor.vendorName': 'anjing' } }, {
    upsert: true,
    runValidators: true
})

db.events.findOne({ userId: '625acf909f5986c218a0260a', 'eventList.vendor.vendorCategory': 'videography' },
    { 'vendorName': 1 })


let IdVendor = "62871acb105877ec84f06e69"
// 62871acb105877ec84f06e69


// decrease ballance Query
db.balances.findOneAndUpdate({ userId: '62c4074a179607943f25660c' }, { $set: { balance: -220000 } }, { runValidators: true })
db.balances.find({ userId: { $in: ['62c4101535d23b7efe6bd864', '62c4074a179607943f25660c'] } }).pretty()

// Bulk Write
db.balances.bulkWrite([
    {
        updateOne: {
            filter: {
                userId: '62c4074a179607943f25660D'
            },
            update: {
                $push: {
                    transaction: {
                        state: 'credit',
                        from: 'idUser',
                        to: 'idTarget',
                        amount: 8000,
                        date: Date.now(),
                        message: 'message'
                    }
                }
            }
        }
    },
    {
        updateOne: {
            filter: {
                userId: '62c4101535d23b7efe6bd864'
            },
            update: {
                $push: {
                    transaction: {
                        state: 'debit',
                        from: 'idUser',
                        to: 'idTarget',
                        amount: 1000000,
                        date: Date.now(),
                        message: 'message'
                    }
                }
            }
        }
    }
])
db.packages.updateOne({ vendorId: '62c666b539add3eb62097dab', 'package._id': new ObjectId('62c66e7c5ac96c55a866568a') }, { $set: { 'package.$.packageName': 'hulalup' } })

db.packages.updateOne({ vendorId: '62c666b539add3eb62097dab' }, { $pull: { 'package': { _id: new ObjectId('62c6b683abe0d11476335d80') } } })

db.events.findOne({ event: { $elemMatch: { _id: new ObjectId('62c70e1f04a51e28ae4c471c') } } }, { 'event.$': 1, _id: 0 })


db.events.findOne({ event: { $elemMatch: { _id: new ObjectId('62c70e1f04a51e28ae4c471c') } } }, { 'event.$': 1, _id: 0 })


db.packages.findOneAndUpdate({ package: { $elemMatch: { _id: new ObjectId('62c70d083e720909ac3d55ba') } } }, { $inc: { 'package.$.sales': 1 } }, { _id: 0, createdAt: 0, updatedAt: 0, _id: 0, new: 1 })

db.events.findOne({ event: { $elemMatch: { _id: new ObjectId('62c6ef0ab3684f97d87d6e1f'), 'vendor.vendorCategory': 'photography' } } }, { 'event.$': 1 })






db.events.findOne({ event: { $elemMatch: { _id: new ObjectId('62c70e1f04a51e28ae4c471c') } } }, { 'event.vendor.$': 1 })

// event id =  62c70e1f04a51e28ae4c471c

db.events.findOne({ event: { $elemMatch: { _id: new ObjectId('62c70e1f04a51e28ae4c471c') } }, 'event.vendor': { $elemMatch: { _id: new ObjectId('62c6ef0ab3684f97d87d6e20') } } }, { 'event.vendor.$[el]': 1 }, { arrayFilter: [{ 'el.vendorCategory': 'photography' }] })



db.events.findOne({
    event: {
        $elemMatch: {
            _id: new ObjectId('62c6ef0ab3684f97d87d6e1f'),
            'vendor.vendorCategory': 'photography'
        }

    }
}, {
    'event.$': 1
})


db.evens.bulkWrite([
    {
        updateOne: {
            filter: {
                'event._id': new ObjectId('62c70e1f04a51e28ae4c471c'),
                'event.vendor.vendorCategory': 'photography'
            }
        },
        update: {
            $set: {
                'event.vendor.$.vendorName': 'kantal'
            }
        }
    }
])

db.events.updateOne({ 'event._id': new ObjectId("62c70e1f04a51e28ae4c471c"), 'event.vendor.vendorCategory': 'decoration' }, { $set: { 'event.vendor.$.vendorName': 'kintil' } })

db.events.findOne({ 'event.vendor.vendorCategory': 'decoration' }, { 'event.vendor.$': 1 })

db.events.aggregate([
    {
        $match: {
            'event._id': new ObjectId('62c70e1f04a51e28ae4c471c')
        }
    },
    {
        $project: {
            vendor: {
                $filter: {
                    input: '$event.vendor',
                    as: 'ctr',
                    cond: { '$$ctr.vendorCategory': 'decoration' }
                }
            }
        }
    }

]).pretty()


// PAKE ESSSSSS

db.events.update(
    {
        'event._id': new ObjectId('62c70e1f04a51e28ae4c471c')
    },
    {
        $set: {
            'event.$[outer].vendor.$[inner].vendorName': 'Kontoolll'
        }
    },
    {
        'arrayFilters': [
            { 'outer._id': new ObjectId('62c70e1f04a51e28ae4c471c') },
            { 'inner.vendorCategory': 'decoration' }
        ]
    }
)

db.events.findOneAndUpdate(
    {
        'event': {
            $elemMatch: {
                '_id': new ObjectId('62c70e1f04a51e28ae4c471c'),
                'vendor.vendorCategory': 'photography'
            }
        }

    },
    {
        $set: {
            'event.$[inner].vendor.$[outer].vendorName': 'Twin photography',
            'event.$[inner].vendor.$[outer].vendorId': 'VENDOR ID'
        },
        $push: {
            'event.$[inner].vendor.$[outer].package': {
                packageNAme: 'Cheap WeddingF'
            }

        },
        $inc: {
            'event.$[inner].totalCost': 25000
        }
    },
    {
        'projection': {
            'event.$': 1
        },
        'arrayFilters': [
            { 'inner._id': new ObjectId('62c70e1f04a51e28ae4c471c') },
            { 'outer.vendorCategory': 'photography' }
        ],
        new: true,
    }
)

db.events.updateOne(
    {
        'event._id': new ObjectId('62c70e1f04a51e28ae4c471c')
    },
    {
        $set: {
            'event.vendor.$[filter].vendorName': 'Silit'
        }
    },
    {
        'arrayFilters': [
            { 'filter.vendorCategory': 'photography' }
        ]
    }
)