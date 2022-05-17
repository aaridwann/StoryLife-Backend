 const mongo  = require('mongoose');

const categoryVendor = ['photography', 'videography', 'makeup artist', 'gawn', 'decoration', 'invitation', 'venue', 'mc', 'entertainment', 'wedding service']
const bookingStatus = ['rejected', 'pending', 'accepted']

const booking = new mongo.Schema({
    // Booking information
    eventName: { type: String, required: true },
    eventId: { type: String, required: true },
    location: { type: Object, required: true },
    bookingDate: { type: String, required: true, default: new Date().toString() },
    eventDate: { type: String, required: true },
    bookingStatus: { type: String, enum: bookingStatus },
    paidStatus: { type: Boolean, default: false },

    // Vendor
    vendorId: { type: String, required: true },
    vendorName: { type: String, required: true },
    vendorAddress: { type: String, required: true },
    vendorPhone: { type: Array, required: true },
    vendorCategory: { type: String, enum: categoryVendor },
    package: [{
        _id: { type: String, required: true },
        packageName: { type: String, required: true },
        details: { type: String, required: true },
        price: { type: Number, required: true },
        discount: { type: Number, default: 0 },
        quantity: { type: Number, required: true, min: 1 },
        total: { type: Number, default: 0 }
    }, { required: true }],
    notes: { type: String, default: "" },

    // Klien
    clientId: { type: String, required: true },
    clientName: { type: String, required: true },
    clientAddress: { type: String, required: true },
    clientPhone: { type: String, required: true }

})

module.exports = mongo.model('booking', booking)