// REGEX QUERY

db.vendors.find({name:{$regex:/rudi/i},category:{$regex:/makeup/i}})

