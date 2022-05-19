import mongoose from 'mongoose'

export let CategoryPackage = ['party', 'wedding', 'prewedding', 'birthday', 'engagement']

const packageList = new mongoose.Schema({
    vendorId: { type: String, required: true, unique: true },
    vendorName: { type: String, required: true, unique: true },
    package: [{
        packageName: { type: String, required: true },
        category: { type: String, enum: CategoryPackage, required: true },
        price: { type: Number, required: true, min: 6 },
        details: { type: String, required: true, min: 25 },
        discount: { type: Number, default: 0 },
        image: { type: String, default: '' }
    }]
},
    { timestamps: true })

export const packagedb = mongoose.model('packageList', packageList)
