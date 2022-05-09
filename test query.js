// REGEX QUERY

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
