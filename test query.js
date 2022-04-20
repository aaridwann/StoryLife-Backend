// REGEX QUERY

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
    { $match: { name: {$regex:/ /i} } },
    { $project: { name: 1, 'schedules': '$schedules.scheduleList.eventDate' } },
])
// Joint 2
db.vendors.aggregate([
    { $match: { name: {} } },
    { $group: { _id: '$name' } }
])
// distinct
db.vendors.distinct('category')
// count
db.orders.count({ vendorName: 'rudi makeup', orderList })