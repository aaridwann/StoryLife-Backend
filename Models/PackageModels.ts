import mongoose from 'mongoose'

export let CategoryPackage = ['party', 'wedding', 'prewedding', 'birthday', 'engagement']
interface PackageList {
    packageName: string,
    category: string,
    price: number,
    details: string,
    discount: string,
    image: string
    date: number

}
export interface Package {
    vendorId: string,
    vendorName: string,
    package: Array<PackageList>
}
const packageList = new mongoose.Schema<Package>({
    vendorId: { type: String, required: true, unique: true },
    vendorName: { type: String, required: true, unique: true },
    package: [{
        packageName: { type: String, required: true },
        category: { type: String, enum: CategoryPackage },
        price: { type: Number, required: true, min: 6 },
        details: { type: String, required: true, min: 25 },
        discount: { type: Number, default: 0 },
        image: { type: String, default: '' },
        date: Number
    }]
},
    { timestamps: true })

export const packagedb = mongoose.model('package', packageList)
