import mongoose from "mongoose";
import { userToVendor } from '../../Controller/Service/Vendor/User To Vendor/userToVendor'
require('dotenv').config()
const url = process.env.DB_URL
beforeAll(async () => {
    if (!url) return false
    await mongoose.connect(url)
})
afterAll(async () => {
    await mongoose.connection.close()
})


let Request = {
    user: {
        _id: '62c515c0fbe6f9f4a9fbe8bc'
    },
    body: {
        vendorName: 'string',
        identity: { typeIdentity: 'ktp', numberIdentity: 2345324534 },
        vendorCategory: 'photography',
        address: { street: 'string', city: 'string', province: 'string', state: 'string' },
        contact: { phone1: 'string', phone2: 'string' },
        bankAccount: { bankName: 'string', accountNumber: 12313412341234 },
        balance: 0
    }
}

describe('user to vendor testing unit', () => {
    // test('failed has been vendor', async () => {
    //     expect(await userToVendor(Request)).toEqual({ state: false, message: 'you has been vendor' })
    // })
    test('create additional is failed', async () => {
        expect(await userToVendor(Request)).toEqual({ state: false, message: 'create additional is failed' })
    })
    // test('Success created vendor', async () => {
    //     expect(await userToVendor(Request)).toEqual({ state: true, message: 'success created vendor' })
    // })
})