const mongoose = require('mongoose');
const categoryVendor = ['photography', 'videography', 'makeup artist', 'gawn', 'decoration', 'invitation', 'venue', 'mc', 'entertainment', 'wedding service']
const bookingStatus = ['rejected', 'pending', 'accepted']

const booking = new mongoose.Schema({
    // Booking information
    eventName: { type: String, required: true },
    eventId: { type: String, required: true },
    location: { type: String, required: true },
    bookingDate: { type: String, required: true, default: new Date().toString() },
    eventDate: { type: String, required: true },
    bookingStatus: { type: String, enum: bookingStatus },
    paidStatus: { type: Boolean, default: false },

    // Vendor
    idVendor: { type: String, required: true },
    vendorName: { type: String, required: true },
    vendorAddress: { type: String, required: true },
    vendorPhone: { type: String, required: true },
    vendorCategory: { type: String, enum: categoryVendor },
    package: [{
        name: { type: String, required: true },
        details: { type: String, required: true },
        price: { type: Number, required: true },
        discount: { type: Number, default: 0 },
        quantity: { type: Number, required: true, min: 1, },
        total: { type: Number, default: this.price * this.quantity }
    }],
    notes: { type: String, default: "" },

    // Klien
    idClient: { type: String, required: true },
    clientName: { type: String, required: true },
    clientAddress: { type: String, required: true },
    clientPhone: { type: String, required: true }

})

module.exports = mongoose.model('booking', booking)