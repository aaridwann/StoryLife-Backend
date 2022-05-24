import mongoose from "mongoose"

const categoryList = ['photography', 'videography', 'makeup artist', 'gawn', 'decoration', 'invitation', 'venue', 'mc', 'entertainment', 'wedding service']
const identityList = ['ktp', 'sim']

export interface VendorModelsInterface {
    image?: string,
    vendorId: string,
    vendorName: string
    identity: { typeIdentity: string, numberIdentity: string },
    vendorCategory: string,
    address: { street: string, city: string, province: string, state: string }
    contact: { phone1: string , phone2: string }
    bankAccount: Array<{ bankName: string, accountNumber: string }>
    state: boolean,
    balance: number
}

const vendorDb = new mongoose.Schema<VendorModelsInterface>({
    image: { type: String, default: '' },
    vendorId: { type: String, required: true, unique: true },
    vendorName: { type: String, required: true, unique: true },
    identity: {
        typeIdentity: { type: String, enum: identityList },
        numberIdentity: { type: Number, required: true, unique: true }
    },
    vendorCategory: { type: String, enum: categoryList },
    address: { street: { type: String, required: true }, city: { type: String, required: true }, province: { type: String, required: true }, state: { type: String, required: true } },
    contact: { phone1:String, phone2:String },
    bankAccount: [{ bankName: { type: String, required: true }, accountNumber: { type: String, required: true } }],
    state: { type: Boolean, default: false },
    balance: { type: Number, default: 0 }
})

export const vendor = mongoose.model('vendor', vendorDb)