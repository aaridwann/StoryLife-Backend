import mongoose from "mongoose";
import { userToVendor } from "../Controller/Function/Tobe Vendor/userToVendor";
let url = 'mongodb://localhost:27017/StoryLife'
import { VendorModelsInterface } from '../Models/VendorsModels'

beforeAll(async () => {
    await mongoose.connect(url)
})

describe('User to vendor Testing', () => {


    test("token and id header not found", async () => {
        let req = {
            user: {
                _id: '',
                token: ''
            },
            body: {
                vendorId: '',
                vendorName: 'grabit photography',
                identity: { typeIdentity: 'ktp', numberIdentity: '11213252' },
                address: { street: 'bhayangkara', city: 'serang', province: 'banten', state: 'indonesia' },
                vendorCategory: 'photography',
                contact: { phone1: '082122169688', phone2: '085966343431' },
                bankAccount: [{ bankName: 'bca', accountNumber: '324367636548878' }],
                state: false,
                balance: 0
            }
        }
        let exec = await userToVendor(req)
        expect(exec).toEqual({ state: false, message: 'id headers or token not found' })
    })

    test('Data body tidak lengkap', async () => {
        let req = {
            user: {
                _id: '4534354w3qw3',
                token: 'q4w32q41w36345aq423w34'
            },
            body: {
                vendorId: '',
                vendorName: '',
                identity: { typeIdentity: 'ktp', numberIdentity: '11213252' },
                address: { street: 'bhayangkara', city: 'serang', province: 'banten', state: 'indonesia' },
                vendorCategory: 'photography',
                contact: { phone1: '082122169688', phone2: '085966343431' },
                bankAccount: [{ bankName: 'bca', accountNumber: '324367636548878' }],
                state: false,
                balance: 0
            }
        }

        let exec = await userToVendor(req)
        console.log(exec)
        expect(exec).toEqual({ state: false, message: { state: false, message: 'vendor name not found' } })
    })

    test('Data body lengkap', async () => {
        let req = {
            user: {
                _id: '4534354w3qw3',
                token: 'q4w32q41w36345aq423w34'
            },
            body: {
                vendorId: 'asdaweqwerqwerf',
                vendorName: 'grabit photography',
                identity: { typeIdentity: 'ktp', numberIdentity: '11213252' },
                address: { street: 'bhayangkara', city: 'serang', province: 'banten', state: 'indonesia' },
                vendorCategory: 'photography',
                contact: { phone1: '082122169688', phone2: '085966343431' },
                bankAccount: [{ bankName: 'bca', accountNumber: '324367636548878' }],
                balance: 0
            }
        }

        let exec = await userToVendor(req)
        console.log(exec)
        expect(exec).toBe(true)
    })


})