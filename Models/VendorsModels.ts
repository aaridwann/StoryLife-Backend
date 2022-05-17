// const mongoose = require("mongoose");
var { mongoose } = require("mongoose")

const categoryList = ['photography', 'videography', 'makeup artist', 'gawn', 'decoration', 'invitation', 'venue', 'mc', 'entertainment', 'wedding service']

const identityList = ['ktp', 'sim']

const vendor = new mongoose.Schema({
    // photo:{type:String, required: true},
    vendorId: { type: String, required: true, unique: true },
    name: { type: String, required: true, unique: true },
    identity: {
        typeIdentity: { type: String, enum: identityList },
        numberIdentity: { type: Number, required: true, unique: true }
    },
    category: { type: String, enum: categoryList },
    address: { street: { type: String, required: true }, city: { type: String, required: true }, province: { type: String, required: true }, state: { type: String, required: true } },
    phone1: { type: String, required: true },
    phone2: { type: String, required: true },
    bankAccount: [
        { bankName: { type: String, required: true }, accountNumber: { type: String, required: true } }
    ],
    status: { type: Boolean, default: false },
    balance: { type: Number, default: 0 }
})
// export const vendor = mongoose.model('vendor',vendorDb)
module.exports = mongoose.model('vendor', vendor)